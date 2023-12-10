const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
})

describe('Blogs', () => {


    describe('when there is initially some blogs saved', () => {


        test('blogs are returned as json', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('all blogs are returned', async () => {
            const response = await api.get('/api/blogs')

            expect(response.body).toHaveLength(helper.initialBlogs.length)
        })

        test('a specific blog is within the returned blogs', async () => {
            const response = await api.get('/api/blogs')
            const titles = response.body.map(r => r.title)

            expect(titles).toContain(
                `Fitzsimons' theory`
            )
        })

        test('unique identifier property is defined', async () => {
            const blogs = await helper.blogsInDb()
            const id = blogs.map(b => b.id)

            expect(id).toBeDefined()
        })
    })

    describe('viewing a specific blog', () => {

        test('succeeds with a valid id', async () => {
            const blogsAtStart = await helper.blogsInDb()

            const blogToView = blogsAtStart[0]

            const resultBlog = await api
                .get(`/api/blogs/${blogToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(resultBlog.body).toEqual(blogToView)
        })

        test('fails with statuscode 404 if blog does not exist', async () => {
            const validNonexistingId = await helper.nonExistingId()

            await api
                .get(`/api/blogs/${validNonexistingId}`)
                .expect(404)
        })

        test('fails with statuscode 400 if id is invalid', async () => {
            const invalidId = '5a3d5da59070081a82a3445'

            await api
                .get(`/api/blogs/${invalidId}`)
                .expect(400)
        })
    })

    describe('addition of a new blog', () => {

        test('a valid blog can be added ', async () => {
            const newBlog = {
                "title": "Learning Jest to test my apps",
                "author": "Marcos Valentín Fitzsimons",
                "url": "https://marcosfitzsimons.com.ar",
                "likes": 129730,
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
            const titles = blogsAtEnd.map(b => b.title)
            expect(titles).toContain(
                'Learning Jest to test my apps'
            )
        })

        test('blog without likes has value of 0 by default', async () => {
            const newBlog = {
                "title": "Learning Jest to test my apps",
                "author": "Marcos Valentín Fitzsimons",
                "url": "https://marcosfitzsimons.com.ar",
            }

            if (!newBlog.likes) {
                newBlog.likes = 0;
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        })

        test('blog without title or url is not added', async () => {
            const newBlog = {
                "author": "Marcos Valentín Fitzsimons",
                "likes": 129730,
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })
    })

    describe('deletion of a blog', () => {


        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd).toHaveLength(
                helper.initialBlogs.length - 1
            )

            const title = blogsAtEnd.map(r => r.title)

            expect(title).not.toContain(blogToDelete.title)
        })
    })

    describe('update of a blog', () => {

        test('update succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            const blogUpdated = {
                "title": "Learning Jest to test my appss",
                "author": "Marcos Valentín Fitzsimons",
                "url": "https://marcosfitzsimons.com.ar",
                "likes": 129730,
            }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogUpdated)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()

            const title = blogsAtEnd.map(r => r.title)

            expect(title).toContain(blogUpdated.title)
        })

    })
})

afterAll(async () => {
    await mongoose.connection.close()
})