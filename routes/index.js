const express = require("express")
const router = express.Router()
const controller = require("../controllers/movies")

router.get("/", (req, res) => {
  res.send('everthing is ok')
})

module.exports = router