const express = require("express")
const model = require('../models')
const router = express.Router()


router.get("/card", (req, res) => {
  res.send('everthing is ok')
})

module.exports = router