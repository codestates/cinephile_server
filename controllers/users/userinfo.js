const { user } = require('../../models')
const crypto = require('crypto')

module.exports = async (req, res) => {
  // 쿠키 확인
  // console.log(req.session, req.session.id, req.session.cookie)
  let id = req.session.userid
  if (id) {
    user.findOne({
      where: {
        id: id
      }
    })
      // userinfo 전달
      .then(user => {
        if (id === user.id) {
          user.password = ''
          res.status(200).send(user)
        }
      })
  }
  // 쿠키가 없으면
  else {
    res.status(401).send()
  }
}