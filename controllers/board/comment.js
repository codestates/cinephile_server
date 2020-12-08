const model = require('../../models')

module.exports = async (req, res) => {
  // 유저, 글(param), 댓글
  const { user, text } = req.body
  const { id } = req.params

  // 유저를 찾는다.
  const theUser = await model.user.findOne({
    where: {
      id: user.id
    }
  })

  // 글을 찾는다.
  const theArticle = await model.article.findOne({
    where: {
      id: id
    }
  })

  // 댓글을 저장한다.
  const newComment = await model.comment.create({
    text: text,
    likecount: 0,
    userId: theUser.id,
    articleId: theArticle.id
  })

  // 렌더링을 위한 해당 댓글 정보를 응답한다.
  await model.comment.findOne({
    where: {
      id: newComment.id
    },
    include: {
      model: model.user,
      where: newComment.userId
    }
  })
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => {
      console.log(err)
    })
}