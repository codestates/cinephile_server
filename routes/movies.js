const express = require("express")
const router = express.Router()
const moviesController = require("../controllers/movies")

router.get("/", moviesController.movies)
router.post("/comment", moviesController.comment)
router.post("/like", moviesController.like)

module.exports = router