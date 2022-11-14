
/// MODULES
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
//TODO: HERE => middleware
const logger = require('./utils/logger')

// Add DB connection
mongoose.connect(config.MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})


const app = express()
app.use(cors())
app.use(express.json())
//TODO: HERE => middleware

app.use('/api/blogs', blogsRouter)

//HERE => middleware
// TODO: Add morgan ?

module.exports = app