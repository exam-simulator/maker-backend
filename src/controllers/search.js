const { prisma } = require('../generated')

module.exports = async (req, res) => {
  const { term } = req.query
  const exams = await prisma.exams({
    where: {
      AND: [
        { published: true },
        { verified: true },
        {
          OR: [{ title_contains: term }, { description_contains: term }, { code_contains: term }]
        }
      ]
    },
    orderBy: 'createdAt_DESC',
    first: 20
  })
  res.status(200).send({ exams: exams.length ? exams : [] })
}
