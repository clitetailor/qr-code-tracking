const db = require('./database')
const { User, QRCode, TrackingInfo } = db

User.create({
  username: 'vagrant',
  password: 'vagrant'
}).then(user => {
  user.createQRCode({
    title: 'Find Pet',
    qrcodeUrl: 'https://localhost:8080'
  })
})
