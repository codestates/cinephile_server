const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.send('everthing is ok')
})

module.exports = router