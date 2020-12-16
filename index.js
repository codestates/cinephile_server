const express = require("express")
const https = require("https")
const fs = require("fs")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const cors = require("cors")

require("dotenv").config()

const mainRouter = require("./routes/index")
const boardRouter = require("./routes/board")
const usersRouter = require("./routes/users")
const settingRouter = require("./routes/setting")

// https options
const option =
  process.env.NODE_ENV === "production"
    ? {
      key: fs.readFileSync("/etc/letsencrypt/live/cinephile.tk/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/cinephile.tk/fullchain.pem")
    }
    : undefined

// server
const app = express()
const PORT = process.env.PORT || 3000

// client
app.use(express.static('public'))

// middleware
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true
  }))
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  session({
    secret: '@final',
    key: 'token',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // sameSite: 'none', // 모든 요청마다 쿠키 전송이 가능합니다. with secure
      // secure: true // HTTPS
    }
  })
)

// router
app.use("/", mainRouter)
app.use("/users", usersRouter)
app.use("/board", boardRouter)
app.use("/setting", settingRouter)

// http, https
option ?
  https.createServer(option, app).listen(PORT, () => {
    console.log(`HTTPS is running at port ${PORT}`)
  })
  :
  app.listen(PORT, () => {
    console.log(`HTTP is running at port ${PORT}`)
  })