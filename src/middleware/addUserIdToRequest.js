const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.cookies[process.env.COOKIE]
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = userId
  }
  next()
}
