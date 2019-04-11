module.exports = (sequelize, DataTypes) => {
  const QRCode = sequelize.define(
    'QRCode',
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      qrcodeUrl: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  )

  QRCode.associate = function(models) {
    const { User } = models
    QRCode.belongsTo(User, {
      foreignKey: 'userId',
      constrain: false
    })
  }

  return QRCode
}
