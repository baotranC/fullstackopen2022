// npm test -- tests/user_api.test.js
const app = require('../app')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

// npm test -- -t 'when there is initially one user in db'
describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		jest.setTimeout(100000)
	
		await User.deleteMany({})
	
		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'rootName', name: 'rootName', passwordHash: passwordHash })
	
		await user.save()
	})

	// npm test -- -t 'creation succeeds with a fresh username'
	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	// npm test -- -t 'creation fails with proper status code and message if username already taken'
	test('creation fails with proper status code and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()
	
		const newUser = {
		  username: 'rootName',
		  name: 'Superuser',
		  password: 'salainen',
		}
	
		const result = await api
		  .post('/api/users')
		  .send(newUser)
		  .expect(400)
		  .expect('Content-Type', /application\/json/)
		  expect(result.body.error).toContain('expected `username` to be unique')
	
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	  }, 100000)
})

// AFTER ALL
afterAll(() => {
	mongoose.connection.close()
})