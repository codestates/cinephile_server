const axios = require('axios')

require("dotenv").config()
const CLIENT_ID = process.env.CLIENT_ID // CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET // CLIENT_Secret

module.exports = async (req, res) => {
  // 유저가 선택한 영화의 제목(params)
  const { title } = encodeURI(req.params)
  // const title = encodeURI(req.body.title)
  // 또는 display, start, genre, country, yearfrom, yearto

  try {
    // 네이버 API, 영화를 검색한다.
    const list = await axios({
      method: 'get',
      url: `https://openapi.naver.com/v1/search/movie.json?query=${title}`,
      headers: {
        'X-Naver-Client-Id': `${CLIENT_ID}`,
        'X-Naver-Client-Secret': `${CLIENT_SECRET}`
      }
    })

    // 영화 목록을 응답한다.
    res.status(200).send(list.data)
  }
  catch (err) {
    console.log(err)
  }
}