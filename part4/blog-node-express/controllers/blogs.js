const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blogId = request.params.id
    const blog = await Blog.findById(blogId).populate({ path: 'comments' })

    if (!blog) return response.status(404).json('Blog not found')

    response.json(blog)
})

// Comments 

blogsRouter.post('/:id/comments', async (req, res) => {
    const blogId = req.params.id;

    const { content } = req.body;
    if (!content) return res.status(400).json('Comment must include content')

    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json('Blog not found');

    const comment = new Comment({ content, blog: blog.id });

    const savedComment = await comment.save();

    blog.comments.push(savedComment._id);
    await blog.save();

    res.status(201).json(savedComment);
});

blogsRouter.delete('/:id', async (request, response) => {
    const blogId = request.params.id
    const user = request.user

    const blog = await Blog.findById(blogId)
    if (!blog) return response.status(404).json('Blog not found')

    if (user.id.toString() === blog.user.toString()) {
        const blogDeleted = await Blog.findByIdAndDelete(blogId)
        if (!blogDeleted) return response.status(404).json('Blog not found')
    } else {
        return response.status(400).json(`You're not allowed to delete this post`)
    }

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const user = await User.findById(request.user.id)
    if (!body.title || !body.url) {
        return response.status(400).json('Bad request')
    }

    const blog = {
        ...body,
        likes: body.likes || 0,
        user: user.id
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    if (!updatedBlog) return response.status(404).json('Blog not found');

    response.json(updatedBlog)
})


blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    if (!body.title || !body.url) {
        return response.status(400).json('Bad request')
    }

    const newBlog = {
        ...body,
        likes: body.likes || 0,
        user: user.id
    }

    const blog = new Blog(newBlog)

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()

    response.status(201).json(savedBlog)
})






module.exports = blogsRouter