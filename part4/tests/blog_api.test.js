// npm test -- tests/blog_api.test.js

const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')

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
// npm test -- -t 'when blog post is created'
describe('when blog post is created', () => {
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
		const lastBlogAdded = response.body[response.body.length - 1]
		expect(lastBlogAdded).toMatchObject(newBlog)
	}, 100000)
})

// 4.11 and 4.12
// npm test -- -t 'when blog post is created with missing properties'
describe('when blog post is created with missing properties', () => {
	test('likes property is missing from the request, default to the value 0', async () => {
		await api
			.post('/api/blogs')
			.send(helper.blogWithNonExistingLike)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		const lastBlogAdded = response.body[response.body.length - 1]
		expect(lastBlogAdded.likes).toBe(0)
	}, 10000)

	// 4.12
	test('title property is missing from the request, responds with status code 400 Bad Request', async () => {
		await api
			.post('/api/blogs')
			.send(helper.blogWithNonExistingTitle)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	}, 100000)

	test('url property is missing from the request, responds with status code 400 Bad Request', async () => {
		await api
			.post('/api/blogs')
			.send(helper.blogWithNonExistingUrl)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	}, 100000)
})

// 4.13
// npm test -- -t 'when a blog is deleted'
describe('when a blog is deleted', () => {
	test('total number of blogs in the system is decreased by one', async () => {
		const response = await api.get('/api/blogs')
		const blogToDelete = response.body[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const response2 = await api.get('/api/blogs')
		expect(response2.body).toHaveLength(response.body.length - 1)
	}, 100000)

	test('content of the blog post is deleted correctly', async () => {
		const response = await api.get('/api/blogs')
		const blogToDelete = response.body[0]
		const titleOfBlogToDelete = blogToDelete.title

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const response2 = await api.get('/api/blogs')
		const titles = response2.body.map(r => r.title)
		expect(titles).not.toContain(titleOfBlogToDelete)
	}, 100000)
})

// 4.14
// npm test -- -t 'when a blog is updated'
describe('when a blog is updated', () => {
	test('total number of blogs in the system is the same', async () => {
		const response = await api.get('/api/blogs')
		const blogToUpdate = response.body[0]

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdate)
			.expect(204)

		const response2 = await api.get('/api/blogs')
		expect(response2.body).toHaveLength(response.body.length)
	}, 100000)

	test('content of the blog post is updated correctly, likes and author', async () => {
		const newTitle = "New title"
		const newLikes = 8

		const response = await api.get('/api/blogs')
		const blogToUpdate = response.body[0]
	
		blogToUpdate.title = newTitle
		blogToUpdate.likes = newLikes

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdate)
			.expect(204)

		const response2 = await api.get('/api/blogs')
		const blogUpdated = response2.body[0]
		expect(blogUpdated.likes).toBe(newLikes)
		expect(blogUpdated.title).toBe(newTitle)
	}, 100000)
})

// AFTER ALL
afterAll(() => {
	mongoose.connection.close()
})