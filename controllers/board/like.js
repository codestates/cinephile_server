const model = require('../../models')

module.exports = async (req, res) => {
  const { token } = req.cookies

  // 토큰을 확인한다.
  if (token) {
    try {
      // 유저, 댓글
      const { user, comment } = req.body

      // 좋아요 테이블을 조회한다.
      const [data, created] = await model.like
        .findOrCreate({
          where: {
            userId: user.id,
            commentId: comment.id
          },
          defaults: {
            userId: user.id,
            commentId: comment.id
          }
        })

      // 해당 행이 없으면 데이터 추가 & 좋아요 숫자 ++
      if (created) {
        await model.comment.increment('likecount', {
          where: {
            id: comment.id
          }
        })
        // 변경된 댓글 데이터
        res.status(200).send('좋아요 ++')
      }
      // 해당 행이 있으면 데이터 삭제 & 좋아요 숫자 --
      else {
        await model.like.destroy({
          where: {
            id: data.id
          }
        })
        await model.comment.decrement('likecount', {
          where: {
            id: comment.id
          }
        })
        // 변경된 댓글 데이터
        res.status(200).send('좋아요 --')
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  else {
    res.status(404).send('로그인을 하세요.')
  }
}