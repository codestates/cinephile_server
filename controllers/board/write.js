const model = require('../../models')
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async (req, res) => {
  const { token } = req.cookies

  // 토큰을 확인한다.
  if (token) {
    try {
      // 유저, url, 제목, 본문
      const { user, url, title, text, upload_url } = req.body

      // 유저가 선택한 영화 정보의 html을 가져온다.
      const getHtml = axios.get(url)

      // 해당 html을 크롤링한다.
      const selectedMovie = await getHtml
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

          return movie
        })

      // 영화 데이터를 저장한다.
      const movieData = await model.movie.create({
        title: selectedMovie['title'],
        sub_title: selectedMovie['sub_title'],
        genre: selectedMovie['summary_genre'],
        nation: selectedMovie['summary_nation'],
        runtime: selectedMovie['summary_runtime'],
        pubdate: selectedMovie['summary_pubdate'],
        director: selectedMovie['director'],
        actor: selectedMovie['actor'],
        rating: selectedMovie['rating'],
        poster: selectedMovie['poster'],
        story1: selectedMovie['story_h5'],
        story2: selectedMovie['story_tx']
      })

      // 글 데이터를 저장한다.
      const article = await model.article.create({
        title: title,
        text: text,
        upload_url: upload_url ? upload_url : null,
        userId: user,
        movieId: movieData.id
      })

      // 새로운 글 정보를 응답한다.
      res.status(200).send(article)
    }
    catch (err) {
      console.log(err)
    }
  }
  else {
    res.status(404).send('로그인을 하세요.')
  }
}