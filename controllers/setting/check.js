const model = require('../../models')

module.exports = async (req, res) => {
  const { email, nickname } = req.body
  const { token } = req.cookies

  // 토큰을 확인한다.
  if (token) {
    if (email) {
      const checkEmail = await model.user.findOne({
        where: {
          email: email
        }
      })
      if (checkEmail === null) res.status(200).send('사용 가능한 이메일입니다.')
      if (checkEmail) res.status(404).send('해당 이메일이 이미 존재합니다.')
    }
    else if (nickname) {
      const checkNickname = await model.user.findOne({
        where: {
          nickname: nickname
        }
      })
      if (checkNickname === null) res.status(200).send('사용 가능한 닉네임입니다.')
      if (checkNickname) res.status(404).send('해당 닉네임이 이미 존재합니다.')
    }
  }
  else {
    res.status(401).send('유효 토큰이 아닙니다.')
  }
}