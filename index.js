const express = require("express")
const fs = require("fs")
const https = require("https")
const morgan = require("morgan")
const session = require("express-session")
const cors = require("cors")

require("dotenv").config()

const indexRouter = require("./routes/index")
const moviesRouter = require("./routes/movies")
const usersRouter = require("./routes/users")

// https options
// const option =
//   process.env.NODE_ENV === "production"
//     ? {
//       key: fs.readFileSync(__dirname + ""),
//       cert: fs.readFileSync(__dirname + "")
//     }
//     : undefined

// server
const app = express()
const PORT = process.env.PORT || 80

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
app.use(
  session({
    secret: '@final',
    resave: false,
    saveUninitialized: true,
  })
)

// router
app.use("/", indexRouter)
app.use("/movies", moviesRouter)
app.use("/users", usersRouter)

// http, https
// option ?
//   https.createServer(option, app).listen(PORT, () => {
//     console.log(`Server is running at port ${PORT}`)
//   })
//   :
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})