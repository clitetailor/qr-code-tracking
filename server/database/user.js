module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  )

  User.associate = function(models) {
    const { QRCode } = models

    User.hasMany(QRCode, {
      foreignKey: 'userId'
    })
  }

  return User
}
