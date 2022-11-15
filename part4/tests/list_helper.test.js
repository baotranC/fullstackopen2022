/*
	Another way of running a single test (or describe block) is to specify the name of the test to be run with the -t flag:
		e.g.: npm test -- -t 'when list has only one blog, equals the likes of that'
*/

const listHelper = require('../utils/list_helper')

// 4.3
test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

// 4.4
describe('total likes', () => {
	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})
})

// 4.4
describe('total likes', () => {
	const blogs = [
		{
			_id: "5a422a851b54a676234d17f7",
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 7,
			__v: 0
		},
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0
		},
		{
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		}
	]

	test('when list has multiple blogs, equals the likes of that', () => {
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(24)
	})
})

// 4.5
describe('blog with the most likes', () => {
	const expectedResult = {
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		likes: 12
	}

	const blogs = [
		{
			_id: "5a422a851b54a676234d17f7",
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 7,
			__v: 0
		},
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0
		},
		{
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		}
	]

	test('when list has multiple blogs, return formatted blog', () => {
		const result = listHelper.favoriteBlog(blogs)
		expect(result).toEqual(expectedResult)
	})
})

// 4.6
describe('author with the most likes', () => {
	const expectedResult = {
		author: "Edsger W. Dijkstra",
		blogs: 2
	}

	const blogs = [
		{
			_id: "5a422a851b54a676234d17f7",
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 7,
			__v: 0
		},
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0
		},
		{
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		},
		{
			_id: "5a422a851b54a676234d17f6",
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 10,
			__v: 0
		},
		{
			_id: "5a422a851b54a676334d17f6",
			title: "World",
			author: "Hello",
			url: "url hello",
			likes: 8,
			__v: 0
		},
	]

	test('when list has multiple blogs, return author with the most likes and total number of likes', () => {
		const result = listHelper.mostBlogs(blogs)
		expect(result).toEqual(expectedResult)
	})
})

// 4.7
describe('author with the most likes', () => {
	const expectedResult = {
		author: "Edsger W. Dijkstra",
		likes: 17
	}

	const blogs = [
		{
			_id: "5a422a851b54a676234d17f7",
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 7,
			__v: 0
		},
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0
		},
		{
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		},
		{
			_id: "5a422a851b54a676234d17f6",
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 10,
			__v: 0
		},
		{
			_id: "5a422a851b54a676334d17f6",
			title: "World",
			author: "Hello",
			url: "url hello",
			likes: 8,
			__v: 0
		},
	]
	
	test('when list has multiple blogs, return author with the most likes and total number of likes', () => {
		const result = listHelper.mostLikes(blogs)
		expect(result).toEqual(expectedResult)
	})
})
