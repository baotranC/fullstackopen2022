
/// MODULES / MIDDLEWARES
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

// DB connection
mongoose.connect(config.MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

/// MIDDLEWARES
const app = express()
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
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

/* Middleware that is used for catching requests
   made to non-existent routes */
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

/* Middleware that handles the errors
=> this has to be the last loaded middleware */
const errorHandler = (error, request, response, next) => {
	// console.error(error.message)
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} 
	next(error)
}
app.use(errorHandler)

// process.on('uncaughtException', function (error) {
// 	console.error(`The app crashed ${error.message}`);
// });

module.exports = app