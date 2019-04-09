module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('QRCodes', 'description', {
      type: Sequelize.STRING
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('QRCodes', 'description')
  }
}
