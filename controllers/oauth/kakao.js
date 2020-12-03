const { user } = require('../../models')
const axios = require('axios')

require("dotenv").config()

module.exports = {
  link: async (req, res) => {
    // 코드를 얻었다.
    const code = req.query.code
    const REST_API_KEY = process.env.REST_API_KEY // REST_API_KEY
    const REDIRECT_URI = process.env.REDIRECT_URI // REDIRECT_URI

    // 토큰을 요청한다.
    const getToken = await axios({
      method: 'post',
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    // 토큰을 얻었다.
    const ACCESS_TOKEN = getToken.data.access_token

    // 토큰으로 유저정보를 요청한다.
    const getUserinfo = await axios({
      method: 'get',
      url: `https://kapi.kakao.com/v2/user/me`,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })

    // 회원가입 & 로그인
    const id = getUserinfo.data.id
    await user
      .findOrCreate({
        where: { email: id },
        defaults: {
          email: id
        }
      })
      .then((user, created) => {
        if (created) {
          res.cookie('token', ACCESS_TOKEN)
          res.status(200).send(user)
        }
        else {
          res.cookie('token', ACCESS_TOKEN)
          res.status(200).send(user)
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




