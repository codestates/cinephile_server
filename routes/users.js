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

router.get("/naver", oauthController.naver.link)
router.get("/naver/unlink", oauthController.naver.unlink)

router.get("/facebook", oauthController.facebook.link)
router.get("/facebook/unlink", oauthController.facebook.unlink)

module.exports = router