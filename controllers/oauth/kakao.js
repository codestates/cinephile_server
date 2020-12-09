const { user } = require('../../models')
const axios = require('axios')

require("dotenv").config()
const REST_API_KEY = process.env.REST_API_KEY // REST_API_KEY
const REDIRECT_URI_KA = process.env.REDIRECT_URI_KA // REDIRECT_URI_KA

module.exports = {
  link: async (req, res) => {
    // 코드를 얻었다.
    const code = req.query.code

    // 토큰을 요청한다.
    const token = await axios({
      method: 'post',
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI_KA}&code=${code}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    // 토큰을 얻었다.
    const ACCESS_TOKEN = token.data.access_token

    // 토큰으로 유저정보를 요청한다.
    const userinfo = await axios({
      method: 'get',
      url: `https://kapi.kakao.com/v2/user/me`,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })

    // 로그인 & 회원가입
    const id = userinfo.data.id
    const nickname = userinfo.data.properties.nickname
    await user
      .findOrCreate({
        where: { oauth_id: id },
        defaults: {
          oauth_id: id,
          nickname: nickname
        }
      })
      .then((user, created) => {
        // console.log(user, created)
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
    axios({
      method: 'post',
      url: 'https://kapi.kakao.com/v1/user/unlink',
      headers: {
        Authorization: `Bearer ${req.cookies.token}`
      }
    })
      .then(result => {
        res.status(200).send(`id: ${result.data.id} unlink success`)
      })
      .catch(err => {
        console.log(err)
        res.status(401).send('this access token does not exist')
      })
  }
}




