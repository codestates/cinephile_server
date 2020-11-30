const session = require("express-session")

module.exports = (req, res) => {
  // 세션 파괴
  req.session.destroy(() => {
    res.status(205).send('Logged out successfully')
  })
}