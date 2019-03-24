const path = require('path')
const qrcode = require('qrcode')

async function main() {
  try {
    await qrcode.toFile(
      path.resolve(__dirname, 'assets/sample.png'),
      'Hello, everyone!',
      {
        color: {
          dark: '#000',
          light: '#fff'
        },
        margin: 1
      }
    )
  } catch (error) {
    console.log(error)
  }
}

main()
