const roles = ['USER', 'ADMIN']

const isAuthenticated = async (_, args, ctx, info) => {
  if (!ctx.userId) throw new Error('Not Authorized. Please Sign In.')
  if (!roles.includes(ctx.user.role)) throw new Error('Not Authorized. Invalid Permissions.')
}

const isAdmin = async (_, args, ctx, info) => {
  if (!ctx.userId) throw new Error('Not Authorized. Please Sign In.')
  if (ctx.user.role !== 'ADMIN') throw new Error('Not Authorized. Must be Administrator.')
}

module.exports = {
  isAuthenticated,
  isAdmin
}
