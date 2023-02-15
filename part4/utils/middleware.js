
const config = require('./config')
const User = require("../models/user")
const jwt = require("jsonwebtoken")


/* Middleware that is used for catching requests
   made to non-existent routes */
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

/* 	Middleware that takes the token from the 
	Authorization header and place it into the 
	token field of the request object */
const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization")

	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		request.token = authorization.replace('bearer ', '')
	}
	next()
}

/* 	Middleware that finds out the user and 
	sets it to the request object */
const userExtractor = async (request, response, next) => {
	const token = request.token
	console.log("userExtractor token", token)
	if (token) {
		const decodedToken = jwt.verify(token, config.SECRET)
		const user = await User.findById(decodedToken.id)
		request.user = user
	}
	next()
}

/* Middleware that handles the errors
=> this has to be the last loaded middleware */
const errorHandler = (error, request, response, next) => {
	// console.error(error.message)
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(400).json({ error: 'token missing or invalid' })
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({ error: 'token expired' })
	}
	next(error)
}

module.exports = {
	unknownEndpoint,
	tokenExtractor,
	userExtractor,
	errorHandler
}