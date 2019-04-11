const { Router } = require('express')
const path = require('path')

const { contractAuthToken } = require('../auth')
const { QRCode } = require('../database')

const assetsRouter = Router()

assetsRouter.get('/:qrcodeId', async (req, res) => {
  res.sendFile(path.resolve(__dirname, `../assets/${req.params.qrcodeId}`))
})

module.exports = {
  assetsRouter
}
