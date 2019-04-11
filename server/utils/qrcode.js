const path = require('path')
const qrcode = require('qrcode')

async function generateQRCode(qrcodeId) {
  const qrcodeUrl = trackingUrl(qrcodeId)

  await qrcode.toFile(
    path.resolve(__dirname, `../assets/${qrcodeId}.png`),
    qrcodeUrl,
    {
      color: {
        dark: '#000',
        light: '#fff'
      },
      margin: 1
    }
  )

  return qrcodeUrl
}

function trackingUrl(qrcodeId) {
  return `${process.env.HOST_NAME}/code/${qrcodeId}`
}

module.exports = {
  generateQRCode,
  trackingUrl
}
