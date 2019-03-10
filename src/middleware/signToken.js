const jwt = require('jsonwebtoken')

const { COOKIE, JWT_SECRET } = process.env

module.exports = (res, userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET)
  res.cookie(COOKIE, token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  })
}
