const express = require("express")
const model = require('../models')
const router = express.Router()

router.post("/", async (req, res) => {
  const { token } = req.cookies
  const { user } = req.body

  if (token) {
    try {
      const oauthLoginuser = await model.user.findOne({
        where: {
          id: user
        }
      })
      oauthLoginuser.password = ''
      res.status(200).send(oauthLoginuser)
    }
    catch (err) {
      console.log(err)
    }
  }
  else {
    res.status(401).send('유효하지 않은 토큰입니다.')
  }
})

router.get("/card", async (req, res) => {
  try {
    const board = await model.article.findAll({
      include: [model.user, model.movie]
    })
    res.status(200).send(board)
  }
  catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router