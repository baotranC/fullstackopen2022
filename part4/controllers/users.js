const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
	const { username, name, password } = request.body

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	// The password sent in the request is not stored in the database. 
	// We store the hash of the password.
	const user = new User({
		username,
		name,
		passwordHash,
	})

	try {
		const savedUser = await user.save()
		response.status(201).json(savedUser)
	} catch (exception) {
		next(exception)
	}
})

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users)
})

module.exports = usersRouter