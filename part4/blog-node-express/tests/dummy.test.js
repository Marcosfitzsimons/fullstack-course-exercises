const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('of empty list is zero', () => {
        const blogs = []

        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }]

        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(5)
    })


    test('of a bigger list is calculated right', () => {
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }, {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 1,
            __v: 0
        }, {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2,
            __v: 0
        }]

        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(8)
    })
})

describe('favorite blog', () => {

    test('of empty list is zero', () => {
        const blogs = []

        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(null)
    })

    test('when list has only one blog equals the likes of that', () => {
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }]

        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })


    test('of a bigger list is calculated right', () => {
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }, {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 1,
            __v: 0
        }, {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2,
            __v: 0
        }]

        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

})

describe('author with most blogs', () => {

    test('of empty list is zero', () => {
        const blogs = []

        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(null)
    })

    test('when list has only one blog equals the likes of that', () => {
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }]

        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })


    test('of a bigger list is calculated right', () => {
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }, {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 1,
            __v: 0
        }, {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Marcos Fitzsimons',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2,
            __v: 0
        }]

        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 2
        })
    })

})

describe('author with most likes', () => {

    test('of empty list is zero', () => {
        const blogs = []

        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(null)
    })

    test('when list has only one blog equals the likes of that', () => {
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }]

        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })


    test('of a bigger list is calculated right', () => {
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }, {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 1,
            __v: 0
        }, {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Marcos Fitzsimons',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2,
            __v: 0
        }]

        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 6
        })
    })

})