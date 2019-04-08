const db = require('./database')

function context(input) {
  return {
    ...db
  }
}

module.exports = {
  context
}
