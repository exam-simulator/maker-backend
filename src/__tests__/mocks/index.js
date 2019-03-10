const userMock = jest.fn(() => ({
  id: 'cjsshgdhrdaky0b70iuvdrhfs',
  googleID: '1234567890',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  image: 'https://www.google.com/image.jpg',
  homepage: 'https://www.homepage.com',
  role: 'USER',
  createdAt: '2019-03-03T05:36:33.615Z'
}))

const coverMock = jest.fn(() => [
  {
    id: 'cjssjhyeede2w0b70npid97is',
    variant: 2,
    text: 'UFC Quiz'
  },
  {
    id: 'cjssjhyeede2w0b70npid97it',
    variant: 1,
    text: 'How well do you know your mixed martial arts ?'
  }
])

module.exports = {
  userMock,
  coverMock
}
