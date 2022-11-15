const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const totals = blogs.map(blog => blog.likes).reduce((prev, current) => prev + current);
	return totals;
}

const favoriteBlog = (blogs) => {
	const favoriteBlog = blogs.reduce((prev, current) => prev.likes > current.likes ? prev : current);

	const favoriteBlogFormatted = {
		title: favoriteBlog.title,
		author: favoriteBlog.author,
		likes: favoriteBlog.likes
	}

	return favoriteBlogFormatted;
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}