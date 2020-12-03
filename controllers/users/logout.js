module.exports = (req, res) => {
  // 세션 파괴
  console.log(req.session)
  req.session.destroy(() => {
    console.log(req.session)
    res.status(205).send('Logged out successfully')
  })
}