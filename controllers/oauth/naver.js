const { user } = require('../../models')
const axios = require('axios')

require("dotenv").config()
const CLIENT_ID = process.env.CLIENT_ID // CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET // CLIENT_Secret

module.exports = {
  link: async (req, res) => {
    // 네이버 로그인 취소
    if (req.query.error) {
      res.status(200).redirect('http://localhost:3001')
    }

    // 코드를 얻었다.
    const code = req.query.code
    const state = req.query.state

    // 토큰을 요청한다.
    const token = await axios({
      method: 'post',
      url: `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&state=${state}`,
      headers: {
        'X-Naver-Client-Id': CLIENT_ID,
        'X-Naver-Client-Secret': CLIENT_SECRET
      }
    })
    // 토큰을 얻었다.
    const ACCESS_TOKEN = token.data.access_token

    // 토큰으로 유저정보를 요청한다.
    const userinfo = await axios({
      method: 'get',
      url: `https://openapi.naver.com/v1/nid/me`,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/xml'
      }
    })

    // 로그인 & 회원가입
    const id = userinfo.data.response.id
    await user
      .findOrCreate({
        where: { oauth_id: id },
        defaults: {
          oauth_id: id
        }
      })
      .then((user, created) => {
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
    const token = req.cookies.token
    if (token) {
      const deleteToken = await axios({
        method: 'post',
        url: `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&access_token=${token}&service_provider=NAVER`,
        headers: {
          'X-Naver-Client-Id': CLIENT_ID,
          'X-Naver-Client-Secret': CLIENT_SECRET
        }
      })
      if (deleteToken.data.result === 'success') {
        res.status(200).send(`naver unlink success`)
      }
    }
    else {
      res.status(401).send('this access token does not exist')
    }
  }
}




