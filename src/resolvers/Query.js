const ExamFragment = require('../fragments/ExamFragment')

module.exports = {
  me: async (_, args, ctx, info) => ctx.user,

  exam: async (_, args, ctx, info) => {
    const exam = await ctx.prisma.exam({ id: args.id }).$fragment(ExamFragment)
    if (!exam || !ctx.user) {
      return null
    }
    if (ctx.user.id !== exam.user.id) {
      throw new Error('Access denied: Not exam owner')
    }
    return exam
  },

  exams: async (_, args, ctx, info) => {
    const exams = await ctx.prisma.exams({ ...args }).$fragment(ExamFragment)
    const connection = await ctx.prisma.examsConnection({ where: args.where })
    return {
      exams,
      count: connection.edges.length
    }
  }
}
