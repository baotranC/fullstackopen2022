// const { config2 } = require('dotenv')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

/// APIs: HTTP METHODS
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
	response.json(blogs)
})

const validateBlog = (body, response) => {
	if (!body.title) {
		return response.status(400).json({
			error: 'title missing'
		})
	} else if (!body.url) {
		return response.status(400).json({
			error: 'url missing'
		})
	}

	if (!body.likes) {
		body.likes = 0
	}
}

blogsRouter.post('/', async (request, response, next) => {
	const body = request.body

	try {
		const decodedToken = jwt.verify(request.token, config.SECRET)
		if (!decodedToken.id) {
			return response.status(401).json({ error: 'token invalid' })
		}

		validateBlog(body, response)

		const user = await User.findById(decodedToken.id)

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: user.id
		})


		const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()

		response.status(201).json(savedBlog)
	} catch (exception) {
		next(exception)
	}
})

blogsRouter.delete('/:id', async (request, response, next) => {
	try {
		const decodedToken = jwt.verify(request.token, config.SECRET)
		if (!decodedToken.id) {
			return response.status(401).json({ error: 'token invalid' })
		}

		const blogId = request.params.id
		const user = await User.findById(decodedToken.id);
		const blog = await Blog.findById(blogId);
		
		console.log("BLOG: ", blog)
		console.log("USER: ", user)

		if (blog.user.toString() === user.id.toString()) {
			await Blog.findByIdAndRemove(blogId)
			response.status(204).end()
		} else {
			response.status(401).json({ error: "unauthorized operation" });
		}
	} catch (exception) {
		next(exception)
	}
})

blogsRouter.put('/:id', async (request, response, next) => {
	const { title, author, url, likes } = request.body
	validateBlog(request.body)

	try {
		updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
			{ title, author, url, likes },
			{ new: true, runValidators: true, context: 'query' })
		response.status(204).json(updatedBlog)
	} catch (exception) {
		next(exception)
	}
})

module.exports = blogsRouter