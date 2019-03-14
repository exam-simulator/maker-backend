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
    var exams, connection
    if (args.onlyVerified) {
      exams = await ctx.prisma
        .exams({ where: { ...args.where, verified: true }, first: args.first, skip: args.skip })
        .$fragment(ExamFragment)
      connection = await ctx.prisma.examsConnection({ where: { ...args.where, verified: true } })
    } else {
      exams = await ctx.prisma
        .exams({ where: { ...args.where }, first: args.first, skip: args.skip })
        .$fragment(ExamFragment)
      connection = await ctx.prisma.examsConnection({ where: args.where })
    }
    return {
      exams,
      count: connection.edges.length
    }
  }
}
