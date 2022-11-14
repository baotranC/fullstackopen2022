const notesRouter = require('express').Router()
const Blog = require('../models/blog')

/// APIs: HTTP METHODS
notesRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

notesRouter.post('/', (request, response, next) => {
	// validation
	const body = request.body
	if (!body.title) {
		return response.status(400).json({
			error: 'title missing'
		})
	} else if (!body.author) {
		return response.status(400).json({
			error: 'author missing'
		})
	} else if (!body.url) {
		return response.status(400).json({
			error: 'url missing'
		})
	}
	else if (!body.likes) {
		return response.status(400).json({
			error: 'likes missing'
		})
	}

	const blog = new Blog(body)

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
		.catch(error => next(error))
})

module.exports = notesRouter