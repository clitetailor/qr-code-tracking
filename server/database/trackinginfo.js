module.exports = (sequelize, DataTypes) => {
  const TrackingInfo = sequelize.define(
    'TrackingInfo',
    {
      qrcodeId: DataTypes.INTEGER,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT
    },
    {}
  )

  TrackingInfo.associate = function(models) {
    const { QRCode } = models

    TrackingInfo.belongsTo(QRCode, {
      foreignKey: 'qrcodeId',
      constrain: false
    })
  }

  return TrackingInfo
}
