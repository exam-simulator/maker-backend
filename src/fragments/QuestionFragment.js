module.exports = `
  fragment QuestionFragment on Question {
    id
    variant
    choices {
      id
    }
    answer
  }
`
