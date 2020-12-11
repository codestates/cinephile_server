module.exports = async (req, res) => {
  console.log(req.file) // upload file
  if (req.file) {
    // 파일 url을 저장한다..??
    res.status(200).json(req.file.location)
  }
  else {
    res.status(404).send('파일 첨부가 실패하였습니다.')
  }
}