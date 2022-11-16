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
// 4.8
// npm test -- -t 'correct amount of blog posts in the JSON format'
test('correct amount of blog posts in the JSON format', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(4)
}, 100000)

// 4.9
// npm test -- -t 'unique identifier property of the blog posts is named id'
test('unique identifier property of the blog posts is named id', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
}, 100000)


// 4.10
// npm test -- -t 'when creates a new blog post'
describe('when creates a new blog post', () => {
	test('total number of blogs in the system is increased by one', async () => {
		const newBlog = {
			title: "Happy",
			author: "Sunshine",
			url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
			likes: 20
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
	}, 100000)

	test('content of the blog post is saved correctly', async () => {
		const newBlog = {
			title: "Happy",
			author: "Sunshine",
			url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
			likes: 20
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		const lastBlogAdded = response.body[response.body.length - 1];
		expect(lastBlogAdded).toMatchObject(newBlog)
	}, 100000)
})

// AFTER ALL
afterAll(() => {
	mongoose.connection.close()
})