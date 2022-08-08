const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')

// Load config file
dotenv.config({ path: './config/config.env' })

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

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))

// Running the server
const PORT = process.env.PORT || 3000
app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
