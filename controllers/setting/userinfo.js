const model = require('../../models')
const crypto = require('crypto')

module.exports = async (req, res) => {
  const { user, email, nickname, gender, age } = req.body
  const { token } = req.cookies

  // 토큰을 확인한다.
  if (token) {
    await model.user.findOne({
      where: {
        id: user
      }
    })
    await model.user.update(
      {
        email: email,
        nickname: nickname,
        gender: gender,
        age: age
      },
      {
        where: {
          id: user
        }
      })
    res.status(200).send('회원정보가 정상적으로 수정되었습니다.')
  }
  else {
    res.status(404).send('로그인을 하세요.')
  }
}