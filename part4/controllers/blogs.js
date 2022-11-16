const notesRouter = require('express').Router()
const Blog = require('../models/blog')

/// APIs: HTTP METHODS
notesRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

notesRouter.post('/', async (request, response, next) => {
	// validation
	const body = request.body
	// if (!body.title) {
	// 	return response.status(400).json({
	// 		error: 'title missing'
	// 	})
	// } else if (!body.author) {
	// 	return response.status(400).json({
	// 		error: 'author missing'
	// 	})
	// } else if (!body.url) {
	// 	return response.status(400).json({
	// 		error: 'url missing'
	// 	})
	// }
	// else if (!body.likes) {
	// 	return response.status(400).json({
	// 		error: 'likes missing'
	// 	})
	// }

	if (!body.likes) {
		body.likes = 0
	}

	const blog = new Blog(body)

	try {
		const saveBlog = await blog.save()
		response.status(201).json(saveBlog)
	} catch (exception) {
		next(exception)
	}
})

module.exports = notesRouter