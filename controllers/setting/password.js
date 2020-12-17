const model = require('../../models')
const crypto = require('crypto')

module.exports = async (req, res) => {
  // 유저, 비밀번호, 새비밀번호, 토큰
  const { id, newpassword } = req.body
  const { token } = req.cookies

  // 암호화
  const newhashPassword =
    crypto.createHmac('sha1', 'secret').update(newpassword).digest('hex')

  // 토큰과 유저, 비밀번호를 확인한다.
  if (token) {
    await model.user.update(
      { password: newhashPassword },
      {
        where: {
          id: id
        }
      })
    res.status(200).send('비밀번호가 정상적으로 수정되었습니다.')
  }
  else {
    res.status(401).send('유효하지 않은 토큰입니다.')
  }
}