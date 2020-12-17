const model = require('../../models')

module.exports = async (req, res) => {
  // 유저, 토큰
  const { user } = req.body
  const { token } = req.cookies
  // console.log(req.cookies, req.session, req.sessionID)

  if (token) {
    model.user.findOne({
      where: {
        id: user
      }
    })
      // userinfo 전달
      .then(user => {
        user.password = ''
        res.status(200).send(user)
      })
  }
  // 토큰이 없으면
  else {
    res.status(401).send('유효하지 않은 토큰입니다.')
  }
}