const express = require("express")
const fs = require("fs")
const https = require("https")
const morgan = require("morgan")
const session = require("express-session")
const cors = require("cors")

const indexRouter = require("./routes/index")
const moviesRouter = require("./routes/movies")
const usersRouter = require("./routes/users")

// https options
//

// server
const app = express()
const port = 3000

// middleware
app.use(
  cors({
    origin: ['http://localhost:3001'],
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
const httpsServer = https.createServer(app)
app.listen(port, () => {
  console.log(`server listening on ${port}`)
})