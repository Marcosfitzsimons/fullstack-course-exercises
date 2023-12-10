const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "Fitzsimons' theory",
        "author": "Marcos Valentín Fitzsimons",
        "url": "https://marcosfitzsimons.com.ar",
        "likes": 1222330,
        "id": "656fcf826ec246a1585b9cb9"
    },
    {
        "title": "Learning Full-Stack development",
        "author": "Marcos Valentín Fitzsimons",
        "url": "https://marcosfitzsimons.com.ar",
        "likes": 1973,
        "id": "656fcfba6ec246a1585b9cbb"
    },
    {
        "title": "Learning Full-Stack development",
        "author": "Marcos Valentín Fitzsimons",
        "url": "https://marcosfitzsimons.com.ar",
        "likes": 109730,
        "id": "656fd73e49b7708001ef7653"
    }
]

const initialUser = { "username": "test1", "name": "test1", "password": "test1" }


const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const signToken = (user) =>
    jwt.sign(
        {
            username: user.username,
            id: user._id,
        },
        JWT_SECRET,
        { expiresIn: 60 * 60 }
    );


const authorizationHeader = (user) => ({
    Authorization: `Bearer ${signToken(user)}`,
});

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb, initialUser, authorizationHeader
}