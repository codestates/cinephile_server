const { user, comment } = require('../../models')

module.exports = async (req, res) => {
  const { email, password } = req.body
  await user
    // 이메일 & 비밀번호 확인
    .findOne({
      where: {
        email: email,
        password: password
      },
      // association
      include: [{
        model: comment,
        required: true
      }]
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