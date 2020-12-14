const express = require("express")
const fs = require("fs")
const https = require("https")
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
      key: fs.readFileSync("/etc/letsencrypt/live/final.cinephile.kro.kr/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/final.cinephile.kro.kr/fullchain.pem")
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

// http, https
option ?
  https.createServer(option, app).listen(PORT, () => {
    console.log(`HTTPS is running at port ${PORT}`)
  })

  :
  app.listen(PORT, () => {
    console.log(`HTTP is running at port ${PORT}`)
  })





//socket io

const server = require('http').Server(app);
const io = require("socket.io")(server)


// 소켓
io.on('connection', function (socket) {
  console.log('socket io connect!')

  socket.on('chat message', function (name, msg) {
    console.log('socket.id = ', socket.id)

    io.emit('chat message', name, msg);
  });

  socket.on('enter chatroom', function (name) {
    console.log('유저가 채팅에 들어옴')
    socket.broadcast.emit('chat message', { type: "alert", chat: name + "님이 입장하였습니다.", regDate: Date.now() });
  })

  socket.on('disconnect', function (name) {
    console.log('유저가 채팅을 나감')
    socket.broadcast.emit('chat message', { type: "alert", chat: name + "님이 퇴장하였습니다.", regDate: Date.now() });

  });

});
