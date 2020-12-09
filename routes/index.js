const express = require("express")
const model = require('../models')
const router = express.Router()

router.get("/card", async (req, res) => {
  try {
    const board = await model.article.findAll({
      include: [model.user, model.movie]
    })
    res.status(200).send(board)
  }
  catch (err) {
    console.log(err)
  }
})

module.exports = router