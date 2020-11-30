const { user } = require('../../models')
const crypto = require('crypto')

module.exports = async (req, res) => {
  const { email, password } = req.body
  await user
    // 이메일 & 비밀번호 확인
    .findOne({
      where: {
        email: email,
        password: password
      }
    })
    .then(user => {
      // 로그인 성공
      if (user) {
        req.session.userid = user.id
        // 쿠키 전달
        res.set({ 'Set-Cookie': `session_id=${user.id}` })
        res.status(200).send(user)
      }
      // 로그인 실패
      else {
        res.status(404).send('invalid user')
      }
    })
}