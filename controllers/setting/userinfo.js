const model = require('../../models')

module.exports = async (req, res) => {
  const { id, email, nickname, gender, age } = req.body
  const { token } = req.cookies

  // 토큰을 확인한다.
  if (token) {
    const userinfo = await model.user.update(
      {
        email: email,
        nickname: nickname,
        gender: gender,
        age: age
      },
      {
        where: {
          id: id
        }
      })
    res.status(200).send(userinfo)
  }
  else {
    res.status(401).send('유효하지 않은 토큰입니다.')
  }
}