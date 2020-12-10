const model = require('../../models')

module.exports = async (req, res) => {
  console.log(req.file) // upload file
  if (req.file) {
    try {
      // 파일 url을 저장한다..??
      res.status(200).send(req.file.location)
    }
    catch (err) {
      console.log(err)
    }
  }
  else {
    res.status(404).send('파일 첨부가 실패하였습니다.')
  }

}