module.exports = (req, res) => {
  // 세션 파괴, 토큰 파괴
  req.session.destroy(() => {
    res.status(205).send('로그아웃되었습니다.')
  })
}