const node = [{ variant: 1, text: '' }]
const choices = [
  {
    label: 'A',
    text: ''
  },
  {
    label: 'B',
    text: ''
  },
  {
    label: 'C',
    text: ''
  },
  {
    label: 'D',
    text: ''
  }
]

const answers = [false, false, false, false]

module.exports = {
  cover: [
    { variant: 2, text: 'Large sized text' },
    { variant: 1, text: 'Normal sized text' },
    { variant: 0, text: 'put image url here' }
  ],
  question: [
    {
      variant: 0,
      question: {
        create: node
      },
      choices: {
        create: choices
      },
      answer: { set: answers },
      explanation: {
        create: node
      }
    }
  ]
}
