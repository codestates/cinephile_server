const { user } = require('../../models')
const axios = require('axios')

require("dotenv").config()
const APP_ID = process.env.APP_ID // APP_ID
const SECRET_CODE = process.env.SECRET_CODE // SECRET_CODE
const REDIRECT_URI_FA = process.env.REDIRECT_URI_FA // REDIRECT_URI_FA

module.exports = {
  link: async (req, res) => {
    // 코드를 얻었다.
    const code = req.query.code

    // 토큰을 요청한다.
    const token = await axios({
      method: 'get',
      url: `https://graph.facebook.com/v9.0/oauth/access_token?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI_FA}&client_secret=${SECRET_CODE}&code=${code}`,
      headers: {
      }
    })
    // 토큰을 얻었다.
    const ACCESS_TOKEN = token.data.access_token

    // 토큰으로 유저정보를 요청한다.
    const userinfo = await axios({
      method: 'get',
      url: `https://graph.facebook.com/me`,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    })

    // 로그인 & 회원가입
    const id = userinfo.data.id
    const nickname = userinfo.data.name
    await user
      .findOrCreate({
        where: { oauth_id: id },
        defaults: {
          oauth_id: id,
          nickname: nickname
        }
      })
      .then((user, created) => {
        console.log(user[0])
        if (created) {
          res.cookie('token', ACCESS_TOKEN)
          res.status(200).send(user[0].id)
        }
        else {
          res.cookie('token', ACCESS_TOKEN)
          res.status(200).redirect('http://localhost:3001')
        }
      })
      .catch(err => console.log(err))
  },

  unlink: async (req, res) => {
    res.status(200).redirect('http://localhost:3001')

  }
}