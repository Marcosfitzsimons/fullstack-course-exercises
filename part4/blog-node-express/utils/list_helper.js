const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null;
    }

    let maxLikes = -Infinity;
    let favorite = null;

    for (let i = 0; i < blogs.length; i++) {
        const blogLikes = blogs[i].likes || 0;
        if (blogLikes > maxLikes) {
            maxLikes = blogLikes;
            favorite = blogs[i];
        }
    }

    return favorite ? { title: favorite.title, author: favorite.author, likes: favorite.likes } : null;
}

function mostBlogs(blogs) {
    if (!blogs || blogs.length === 0) {
        return null;
    }

    const authorCount = _.countBy(blogs, 'author');
    const topAuthor = _.maxBy(_.keys(authorCount), author => authorCount[author]);

    return { author: topAuthor, blogs: authorCount[topAuthor] };
}

function mostLikes(blogs) {
    if (!blogs || blogs.length === 0) {
        return null;
    }

    const authorLikes = _.groupBy(blogs, 'author');

    const authorTotalLikes = _.mapValues(authorLikes, blogs => _.sumBy(blogs, 'likes'));

    const topAuthor = _.maxBy(_.keys(authorTotalLikes), author => authorTotalLikes[author]);

    return { author: topAuthor, likes: authorTotalLikes[topAuthor] };
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}