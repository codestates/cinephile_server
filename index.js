const express = require("express")
const fs = require("fs")
const https = require("https")
const morgan = require("morgan")
const cookieParser = require('cookie-parser')
const session = require("express-session")
const cors = require("cors")

require("dotenv").config()

const indexRouter = require("./routes/index")
const boardRouter = require("./routes/board")
const usersRouter = require("./routes/users")

// https options
const option =
  process.env.NODE_ENV === "production"
    ? {
      key: fs.readFileSync("/etc/letsencrypt/live/final.cinephile.kro.kr/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/final.cinephile.kro.kr/fullchain.pem")
    }
    : undefined

// server
const app = express()
const PORT = process.env.PORT || 3000

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
      httpOnly: false,
      // sameSite: 'none', // only secure
      // secure: true // HTTPS
    }
  })
)

// router
app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/board", boardRouter)

// http, https
option ?
  https.createServer(option, app).listen(PORT, () => {
    console.log(`HTTPS is running at port ${PORT}`)
  })
  :
  app.listen(PORT, () => {
    console.log(`HTTP is running at port ${PORT}`)
  })