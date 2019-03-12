const jwt = require('jsonwebtoken')

const { COOKIE, JWT_SECRET, NODE_ENV } = process.env

module.exports = (res, userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET)
  const cookieOptions = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
    domain: NODE_ENV === 'development' ? 'localhost' : '.exam-maker.herokuapp.com'
  }
  res.cookie(COOKIE, token, cookieOptions)
}
