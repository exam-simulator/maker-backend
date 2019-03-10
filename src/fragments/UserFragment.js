module.exports = `
  fragment UserFragment on User {
    id
    googleID
    name
    email
    image
    homepage
    role
    createdAt
    exams {
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
        answer
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
        explanation {
          id
          variant
          text
        }
      }
    }
  }
`
