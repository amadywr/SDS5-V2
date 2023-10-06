require('dotenv').config()
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const app = express()

// app.use(express.static("public"))
app.use(express.static(__dirname + '/public'))

app.use(methodOverride('_method'))

// Passport Config
require('./config/passport')(passport)

// Connect to MongoDB aaa
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Express body parser
app.use(express.urlencoded({ extended: true }))

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

// Routes
app.use('/', require('./routes/index.js'))
app.use('/users', require('./routes/users.js'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running on  ${PORT}`))

module.exports = app
