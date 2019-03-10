const uuid = require('uuid/v1')

module.exports = () =>
  uuid()
    .replace(/-/g, '')
    .slice(0, 8)
