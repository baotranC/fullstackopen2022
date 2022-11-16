const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

// TODO: Create test env (EC)

// BEFORE EACH
beforeEach(async () => {
	jest.setTimeout(100000)

	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

// TESTS
// npm test -- -t 'correct amount of blog posts in the JSON format'
test('correct amount of blog posts in the JSON format', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(4)
}, 100000)

// npm test -- -t 'unique identifier property of the blog posts is named id'
test('unique identifier property of the blog posts is named id', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
}, 100000)


// AFTER ALL
afterAll(() => {
	mongoose.connection.close()
})