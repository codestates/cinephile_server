const { user } = require('../../models')

module.exports = async (req, res) => {
  const { email, password, nickname, sex, age } = req.body
  if (email && password && nickname && sex && age) {
    await user
      // 가입 체크
      .findOrCreate({
        where: { email: email },
        defaults: {
          email: email,
          password: password,
          nickname: nickname,
          sex: sex,
          age: age
        }
      })
      .then(user => {
        // 이메일이 없으면 가입
        if (user[1]) {
          user[0].password = ''
          res.status(200).send(user)
        }
        // 이메일이 있으면 실패
        else {
          res.status(409).send('Already exists user')
        }
      })
      .catch(err => { console.log(err) })
  }
  else {
    // 파라미터가 하나라도 불충분하면
    res.status(422).send('insufficient parameters supplied')
  }
}