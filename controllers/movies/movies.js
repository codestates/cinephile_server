const { movie, expert } = require('../../models')

module.exports = async (req, res) => {
  await movie
    .findAll({
      // association
      include: [{
        model: expert,
        // required: true
      }]
    })
    .then(result => {
      console.log(result)
      res.status(200).send(result)
    })

}