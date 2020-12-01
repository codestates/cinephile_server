const { user } = require('../../models')

module.exports = async (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    await user
      // 가입 체크
      .findOrCreate({
        where: { email: email },
        defaults: {
          email: email,
          password: password
        }
      })
      .then(user => {
        // 이메일이 없으면 가입
        if (user[1]) {
          res.status(200).send(user)
        }
        // 이메일이 있으면 실패
        else {
          res.status(409).send('Already exists user')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  else {
    // 파라미터가 하나라도 불충분하면
    res.status(422).send('insufficient parameters supplied')
  }
}