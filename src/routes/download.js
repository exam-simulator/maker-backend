const { prisma } = require('../generated')
const ExamFragment = require('../fragments/ExamFragment')

function cleanup(x) {
  delete x.id
  delete x.__typename
}

function formatLabel(x) {
  if (x.variant === 2) {
    x.choices = x.choices.filter((c, i) => c.text.length > 0)
  } else if (x.variant === 3) {
    x.choices = x.choices.map((c, i) => {
      return { label: i + 1, text: c.text }
    })
  }
}

function cleanAll(x) {
  x.cover.forEach(cleanup)
  x.test.forEach(n => {
    cleanup(n)
    n.question.forEach(cleanup)
    n.choices.forEach(cleanup)
    n.explanation.forEach(cleanup)
    formatLabel(n)
  })
}

module.exports = async (req, res) => {
  const { id } = req.query
  const data = await prisma.exam({ id }).$fragment(ExamFragment)
  if (!id || !data) {
    return res.status(400)
  }
  const filename =
    data.title
      .toLowerCase()
      .trim()
      .replace(/\s/g, '-')
      .replace(/[^a-z0-9-]/g, '') + '.json'
  const exam = {
    id: data.id,
    author: {
      id: data.user.id,
      name: data.user.name,
      image: data.user.image
    },
    title: data.title,
    code: data.code,
    pass: Number(data.pass),
    time: Number(data.time),
    image: data.image,
    cover: data.cover,
    test: data.test,
    createdAt: data.createdAt
  }
  cleanAll(exam)
  res.status(200).send({ exam, filename })
}
