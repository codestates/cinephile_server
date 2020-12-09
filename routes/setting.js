const express = require("express")
const router = express.Router()
const settingController = require("../controllers/setting")

router.post("/password", settingController.password)
router.post("/userinfo", settingController.userinfo)

module.exports = router