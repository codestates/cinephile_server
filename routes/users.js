const express = require("express")
const router = express.Router()
const usersController = require("../controllers/users")
const oauthController = require("../controllers/oauth")

// default
router.post("/signup", usersController.signup)
router.post("/login", usersController.login)
router.post("/logout", usersController.logout)
router.post("/userinfo", usersController.userinfo)

// OAuth
router.get("/kakao", oauthController.kakao.link)
router.get("/kakao/unlink", oauthController.kakao.unlink)

module.exports = router