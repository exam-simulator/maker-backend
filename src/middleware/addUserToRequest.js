const { prisma } = require('../generated')
const UserFragment = require('../fragments/UserFragment')

module.exports = async (req, res, next) => {
  if (!req.userId) return next()
  const user = await prisma.user({ id: req.userId }).$fragment(UserFragment)
  req.user = user
  next()
}
