//MayanWolfe VOD on 9/4/2022 at 7 pm: Let's build a menu tracking app! #100Devs


// STOPPED AT 2:00:00 ******

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const indexRouter = require('./routes/index')
const menuRouter = require('./routes/menu')
const loginRouter = require('./routes/login')



require('dotenv').config({path: './config/.env'})


// Passport config
// require('./config/passport')(passport)


connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))


// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  

// Passport middleware
//app.use(passport.initialize())
//app.use(passport.session())


app.use(flash())


// Add Routes
app.use('/', indexRouter)
app.use('/menu', menuRouter)
app.use('/login', loginRouter)




 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    