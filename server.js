const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const expressLayouts = require('express-ejs-layouts')

// Load config file
dotenv.config({ path: './config/config.env' })

// Connecting with the database
connectDB()

// Initializing the app
const app = express()

// Setting the templating engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

// app.get('/', (req, res) => {
// 	console.log('Here')
// 	res.render('index', { text1: 'World' })
// })

// Running the server
const PORT = process.env.PORT || 3000
app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
