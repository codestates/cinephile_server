const crypto = require('crypto')
const { user } = require('../../models')

module.exports = async (req, res) => {
  const { email, password } = req.body
  // 암호화
  const hashPassword =
    crypto.createHmac('sha1', 'secret').update(password).digest('hex')

  // 모델 조작
  await user
    // 이메일 & 비밀번호 확인
    .findOne({
      where: {
        email: email,
        password: hashPassword
      }
    })
    .then(user => {
      // 로그인 성공
      if (user) {
        req.session.userid = user.id
        user.password = ''
        res.status(200).send(user)
      }
      // 로그인 실패
      else {
        res.status(404).send('invalid user')
      }
    })
}