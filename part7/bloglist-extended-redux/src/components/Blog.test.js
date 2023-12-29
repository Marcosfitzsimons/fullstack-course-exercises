import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

const blog = {
    'title': "Example",
    'author': "Marcos Fitzsimons",
    'url': "https://marcosfitzsimons.com.ar",
    'likes': 7,
    'user': {
        'id': 123123123,
        'name': 'Marcos Fitzsimons',
        'username': 'marcosfitz21'
    }
}

test('default view, can only see title and author', () => {
    const component = render(
        <Blog blog={blog} />
    )

    const blogTitle = component.container.querySelector('.blogTitle')
    expect(blogTitle).toBeDefined()
    expect(blogTitle).toBeVisible()
    expect(blogTitle).toHaveTextContent(`${blog.title} by ${blog.author}`)
})

// 5.15 unresolved

test('click view button and can see blog detail', () => {
    const component = render(
        <Blog blog={blog} />
    )

    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)

    const blogAll = component.container.querySelector('.blog')
    expect(blogAll).toBeVisible()
    expect(blogAll).toHaveTextContent(`${blog.url}`)
    expect(blogAll).toHaveTextContent(`${blog.likes}`)
})

test('create a new blog', () => {
    const component = render(
        <NewBlogForm />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeDefined()
})