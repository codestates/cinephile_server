const express = require("express")
const https = require("https")
const http = require("http")
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

// server
let httpsServer
let httpServer
option ?
  httpsServer = https.createServer(option, app).listen(PORT, () => {
    console.log(`HTTPS is running at port ${PORT}`)
  })
  :
  httpServer = http.createServer(app).listen(PORT, () => {
    console.log(`HTTP is running at port ${PORT}`)
  })
const server = httpsServer ? httpsServer : httpServer

// socket.io
const io = require('socket.io')(server, {
  cors: "*",
});

io.on('connection', function (socket) {
  console.log('socket io connect!')
  io.emit('receive message', ' ', "유저가 입장하였습니다")

  socket.on('send message', function (name, msg) {
    console.log('socket.id = ', socket.id)
    // socket.removeAllListeners()
    // console.log('리스너 제거됨')

    io.emit('receive message', name, msg)
  })

  socket.on('disconnect', function (name) {
    console.log('유저가 채팅을 나감')
    io.emit('receive message', ' ', "유저가 퇴장하였습니다")
  })
})
