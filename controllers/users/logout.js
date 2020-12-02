module.exports = (req, res) => {
  // 세션 파괴
  req.session.destroy(() => {
    // res.clearCookie('session_id', { path: '/' })
    res.status(205).send('Logged out successfully')
  })
}