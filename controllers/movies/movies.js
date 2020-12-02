const { movie } = require('../../models')

module.exports = async (req, res) => {
  await movie
    .findAll({
      // association
    })
    .then(result => {
      console.log(result)
      res.status(200).send(result)
    })
}