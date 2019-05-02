module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('QRCodes', 'redirectUrl', {
      type: Sequelize.STRING
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('QRCodes', 'redirectUrl')
  }
}
