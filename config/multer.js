const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

require("dotenv").config()
// aws.config.loadFromPath(__dirname + '/awsconfig.json');
aws.config.update({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRET_ACCESSKEY,
  region: process.env.REGION
})

const upload = multer({
  storage: multerS3({
    s3: new aws.S3(),
    bucket: 'finalprojectbuck',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
})

module.exports = upload