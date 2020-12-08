const model = require('../../models')

module.exports = async (req, res) => {
  // 모든 글과 해당 글을 작성한 유저
  try {
    const board = await model.article.findAll({
      include: [model.user]
    })
    res.status(200).send(board)
  }
  catch (err) {
    console.log(err)
  }
}