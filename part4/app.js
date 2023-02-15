
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

// DB connection
mongoose.connect(config.MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.json())

// Middleware that is used to format logs
morgan.token('body', (req) => {
	if (req.method === 'POST') {
		return JSON.stringify(req.body)
	}
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
/* Middleware that is used to define all routes
   for the router object */
app.use(middleware.tokenExtractor);
// app.use(middleware.userExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app