module.exports = args => {
  if (!args.email) throw new Error('Email is required.')
  if (!args.name) throw new Error('Name is required.')
  if (!args.password) throw new Error('Password is required.')
  if (args.password.length < 8) throw new Error('Password must be 8 characters.')
}
