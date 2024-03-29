// 4.3
const dummy = (blogs) => {
	return 1
}

// 4.4
const totalLikes = (blogs) => {
	const totals = blogs.map(blog => blog.likes).reduce((prev, current) => prev + current)
	return totals
}

// 4.5
const favoriteBlog = (blogs) => {
	const favoriteBlog = blogs.reduce((prev, current) => prev.likes > current.likes ? prev : current)

	const favoriteBlogFormatted = {
		title: favoriteBlog.title,
		author: favoriteBlog.author,
		likes: favoriteBlog.likes
	}

	return favoriteBlogFormatted
}

// 4.6
// Reference by Maheer Ali: https://stackoverflow.com/questions/55038993/how-to-sum-value-in-javascript-array-object-form-specific-search-id
const mostBlogs = (blogs) => {
	const nbBlogsPerAuthor = blogs.reduce((prev, current) => {
		const index = prev.findIndex(x => x.author === current.author)
		if (index === -1) {
			current.nbPosts = 1
			prev.push(current)
		} else {
			prev[index].nbPosts += 1
		}
		return prev
	}, [])

	const mostBlogsPerAuthor = nbBlogsPerAuthor.reduce((prev, current) => prev.nbPosts > current.nbPosts ? prev : current)
	const mostBlogsPerAuthorFormatted = {
		author: mostBlogsPerAuthor.author,
		blogs: mostBlogsPerAuthor.nbPosts
	}

	return mostBlogsPerAuthorFormatted
}

// 4.7
// Reference by Maheer Ali: https://stackoverflow.com/questions/55038993/how-to-sum-value-in-javascript-array-object-form-specific-search-id
const mostLikes = (blogs) => {
	const likesPerAuthor = blogs.reduce((prev, current) => {
		const index = prev.findIndex(x => x.author === current.author)
		index === -1 ? prev.push(current) : prev[index].likes += current.likes
		return prev
	}, [])

	const mostLikesAuthor = likesPerAuthor.reduce((prev, current) => prev.likes > current.likes ? prev : current)
	const mostLikesAuthorFormatted = {
		author: mostLikesAuthor.author,
		likes: mostLikesAuthor.likes
	}

	return mostLikesAuthorFormatted
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}