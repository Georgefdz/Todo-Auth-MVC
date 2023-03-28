const express = require('express')
const app = express()
const mongoose = require('mongoose')// This is to connect to the database
const passport = require('passport')//Handles our authentication, it has strategies for different types of authentication, we are using local strategy
const session = require('express-session')
const MongoStore = require('connect-mongo')(session) // Help us have logged in users (handling cookies and sessions)
const flash = require('express-flash')// This is to display flash messages (verification like "You are logged in")
const logger = require('morgan') // This is to log requests to the console
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})// This is to load the environment variables from the .env file

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))// This is to log activate morgan and log requests to the console


// Sessions (This is to store the user's session)
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    