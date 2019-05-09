module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'TrackingInfos',
      'userAgent',
      {
        type: Sequelize.STRING
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'TrackingInfos',
      'userAgent'
    )
  }
}
