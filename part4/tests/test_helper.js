const User = require('../models/user')

const initialBlogs = [
	{
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7
	},
	{
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5
	},
	{
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 10
	},
	{
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2
	}
]

const blogWithNonExistingLike = {
	title: "No likes",
	author: "Michael Chan",
	url: "https://reactpatterns.com/"
}

const blogWithNonExistingTitle = {
	author: "Michael Chan",
	url: "https://reactpatterns.com/",
	likes: 2
}

const blogWithNonExistingUrl = {
	title: "No URL",
	author: "Michael Chan",
	likes: 2
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
	initialBlogs,
	blogWithNonExistingLike,
	blogWithNonExistingTitle,
	blogWithNonExistingUrl,
	usersInDb
}