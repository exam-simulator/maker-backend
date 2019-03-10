const { gqlTestClient } = require('./utils/gqlTestClient')
const { prisma } = require('./utils/createPrismaMock')
const { userMock, coverMock } = require('./mocks')

describe('Exam Resolvers', () => {
  test('Exam owned can get exam by ID', async () => {
    const response = await gqlTestClient(
      /* GraphQL */ `
        {
          exam(id: "cjssjhye6de2t0b706ofy7552") {
            id
            title
            description
            pass
            time
            downloads
            published
            createdAt
            cover {
              id
              variant
              text
            }
          }
        }
      `,
      null,
      userMock()
    )
    expect(prisma.exam).toHaveBeenCalledWith({ id: 'cjssjhye6de2t0b706ofy7552' })
    expect(userMock).toHaveBeenCalled()
    expect(coverMock).toHaveBeenCalled()
    expect(response).toMatchSnapshot()
  })
})
