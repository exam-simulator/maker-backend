const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

module.exports = args => {
  if (!args.name) throw new Error('Name is required.')
  if (args.name.length < 3) throw new Error('Name must be 4 characters.')
  if (!args.email) throw new Error('Email is required.')
  if (!emailRegex.test(args.email)) throw new Error('Email is not valid.')
  if (!args.password) throw new Error('Password is required.')
  if (args.password.length < 8) throw new Error('Password must be 8 characters.')
}
