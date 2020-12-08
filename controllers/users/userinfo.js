const { user } = require('../../models')

module.exports = async (req, res) => {
  // 쿠키 확인
  console.log(req.cookies, req.session, req.sessionID)
  let id = req.body.id
  if (req.cookies.token) {
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