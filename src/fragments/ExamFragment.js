module.exports = `
  fragment ExamFragment on Exam {
    id
    published
    title
    description
    code
    pass
    time
    image
    downloads
    createdAt
    user {
      id
      name
      image
      homepage
    }
    cover {
      id
      variant
      text
    }
    test {
      id
      variant
      question {
        id
        variant
        text
      }
      choices {
        id
        label
        text
      }
      answer
      explanation {
        id
        variant
        text
        href
      }
    }
  }
`
