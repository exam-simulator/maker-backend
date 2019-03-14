const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')

const isDev = process.env.NODE_ENV === 'development'

const devOptions = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
}

const prodOptions = {
  auth: {
    api_key: process.env.SENDGRID_KEY
  }
}

const transport = nodemailer.createTransport(isDev ? devOptions : sgTransport(prodOptions))

module.exports = {
  transport
}
