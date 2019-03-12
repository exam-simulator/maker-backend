const { prisma } = require('../generated')

module.exports = async (req, res, next) => {
  if (!req.userId) return next()
  const user = await prisma.user({ id: req.userId })
  req.user = user
  next()
}
