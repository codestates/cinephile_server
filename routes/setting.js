const express = require("express")
const router = express.Router()
const settingController = require("../controllers/setting")
const upload = require('../config/multer')

router.post("/password", settingController.password)
router.post("/userinfo", settingController.userinfo)
router.post("/check", settingController.check)
router.post("/upload", upload.single('img'), settingController.upload)

module.exports = router