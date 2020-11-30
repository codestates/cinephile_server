const express = require("express")
const router = express.Router()
const controller = require("../controllers/movies")

router.get("/movielists", controller.movielists)

module.exports = router