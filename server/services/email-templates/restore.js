const { HOST } = require('./../../config/keys');
module.exports = (token) => {

  return (
    `<div><a href="${HOST}/api/restore?token=${token}">Odzyskaj konto</a></div>`
  )
}
