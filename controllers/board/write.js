const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async (req, res) => {
  // 유저, url, 글
  const { user, url, article } = req.body

  // 유저가 선택한 영화 정보의 html을 가져온다.
  const getHtml = async () => {
    try {
      return await axios.get(url)
    }
    catch (err) {
      console.log(err)
    }
  }

  // 해당 html을 크롤링한다.
  getHtml()
    .then(html => {
      const movie = {}
      const $ = cheerio.load(html.data)
      const $info = $('div.mv_info_area')
      const $story = $('div.obj_section:first-child')

      // 영화 정보
      movie['title'] = $info.find('h3.h_movie a').text()
      movie['sub_title'] = $info.find('strong.h_movie2').text()
      movie['summary_genre'] = $info.find('dl.info_spec dd:nth-child(2) span:nth-child(1)').text().replace(/\s/g, '')
      movie['summary_nation'] = $info.find('dl.info_spec dd:nth-child(2) span:nth-child(2) a').text()
      movie['summary_runtime'] = $info.find('dl.info_spec dd:nth-child(2) span:nth-child(3)').text()
      movie['summary_pubdate'] = $info.find('dl.info_spec dd:nth-child(2) span:nth-child(4) a').text()
      movie['director'] = $info.find('dl.info_spec dd:nth-child(4)').text()
      movie['actor'] = $info.find('dl.info_spec dd:nth-child(6) p').text()
      movie['rating'] = $info.find('dl.info_spec dd:nth-child(8) a').text() // 이것들은 왜 짝수??
      movie['poster'] = $info.find('div.poster img').attr('src')

      // 영화 줄거리
      movie['story_h5'] = $story.find('h5.h_tx_story').text()
      movie['story_tx'] = $story.find('p.con_tx:nth-child(3)').text() // 이거 왜 세번 째??
      console.log(movie)
    })



  // 데이터를 저장한다.

  // 응답한다.

}