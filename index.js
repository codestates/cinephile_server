const express = require("express")
const fs = require("fs")
const https = require("https")
const http = require("http")
const morgan = require("morgan")
const cookieParser = require('cookie-parser')
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
      httpOnly: false,
      sameSite: 'none', // only secure
      secure: true // HTTPS
    }
  })
)

// router
app.use("/", mainRouter)
app.use("/users", usersRouter)
app.use("/board", boardRouter)
app.use("/setting", settingRouter)

//socket io
const httpServer = http.createServer(app)

io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3001'
  }
})

// 소켓
io.on('connection', function (socket) {
  console.log('socket io connect!')
  socket.on('send message', function (name, msg) {
    console.log('socket.id = ', socket.id)
    socket.removeAllListeners()
    console.log('리스너 제거됨')
    socket.broadcast.emit('receive message', name, msg);
  });
  socket.on('disconnect', function (name) {
    console.log('유저가 채팅을 나감')
    socket.broadcast.emit('message', "손님이 퇴장하였습니다");
  });
});

// server on
option ?
  https.createServer(option, app).listen(PORT, () => {
    console.log(`HTTPS is running at port ${PORT}`)
  })
  :
  httpServer.listen(PORT, () => {
    console.log(`HTTP is running at port ${PORT}`)
  })