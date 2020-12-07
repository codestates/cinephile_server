const express = require("express")
const router = express.Router()
const boardController = require("../controllers/board")

router.get("/", boardController.board)
router.get("/movies", boardController.movies)
router.post("/write", boardController.write)
router.get("/article", boardController.article)

module.exports = router