const model = require('../../models')

module.exports = async (req, res) => {
  // 글(param)
  const { id } = req.params

  // 해당 글과 관련된 모든 정보를 찾는다.
  try {
    const selectedArticle = await model.article.findOne({
      where: {
        id: id
      },
      include: [
        { model: model.user },
        { model: model.movie },
        {
          model: model.comment,
          include: [{ model: model.user }]
        }
        // include: [{ all: true }]
      ]
    })
    res.status(200).send(selectedArticle)
  }
  catch (err) {
    console.log(err)
  }
}