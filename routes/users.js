const express = require("express")
const router = express.Router()
const controller = require("../controllers/users")

router.post("/signup", controller.signup)
router.post("/login", controller.login)
router.post("/logout", controller.logout)
router.get("/userinfo", controller.userinfo)

module.exports = router