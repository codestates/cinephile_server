const express = require("express")
const router = express.Router()
const boardController = require("../controllers/board")

router.get("/", boardController.board)
router.get("/movies/:title", boardController.movies)
router.get("/article/:id", boardController.article)
router.post("/write", boardController.write)
router.post("/comment", boardController.comment)
router.post("/like", boardController.like)

module.exports = router