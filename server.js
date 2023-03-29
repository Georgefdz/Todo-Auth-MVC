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
//This is to set the view engine to ejs
app.set('view engine', 'ejs')
//This is to serve static files (css, images, etc) from public folder
app.use(express.static('public'))
//Parsing incoming requests with urlencoded and json middleware
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

//Flash messages middleware
app.use(flash())

//Routing
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
 
//Starting the server
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    