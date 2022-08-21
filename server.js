const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

// Load config file
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Connecting with the database
connectDB()

// Initializing the app
const app = express()

// Logging requests
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Setting Handlebars as the templating engine
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

// Sessions middleware
app.use(
	session({
		secret: 'cookie unicorn',
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
	})
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

// Running the server
const PORT = process.env.PORT || 3000
app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
