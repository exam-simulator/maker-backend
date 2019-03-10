const { userMock, coverMock } = require('../mocks')

const prisma = {
  exam: jest.fn(() => ({
    $fragment: jest.fn(() => ({
      id: 'cjssjhye6de2t0b706ofy7552',
      title: 'UFC Quiz',
      description: 'Test your knowledge of mixed martial arts.',
      pass: 65,
      time: 10,
      downloads: 8,
      published: true,
      cover: coverMock(),
      user: userMock(),
      createdAt: '2019-03-03T06:33:46.589Z'
    }))
  }))
}

module.exports = {
  prisma
}
