import { createSlice } from '@reduxjs/toolkit'
import blogService from "../services/blogs";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) { return action.payload },
        updateBlogs(state, action) {
            const filteredState = state.filter(blog => blog.id !== action.payload.id)
            return [...filteredState, action.payload]
        },
        filterBlogs(state, action) {
            return state.filter(blog => blog.id !== action.payload)
        }
    }
})

export const { appendBlog, setBlogs, updateBlogs, filterBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        try {
            const blogs = await blogService.getAll()
            dispatch(setBlogs(blogs))
        } catch (err) {
            console.log(err)
        }
    }
}

export const createBlog = content => {
    return async dispatch => {
        try {
            const newBlog = await blogService.create(content)
            dispatch(appendBlog(newBlog))
        } catch (err) {
            console.log(err)
        }

    }
}

export const addLike = blog => {
    return async dispatch => {
        try {
            const blogUpdated = await blogService.update(blog.id, blog)
            dispatch(updateBlogs(blogUpdated))
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteBlog = blog => {
    return async dispatch => {
        try {
            await blogService.deleteB(blog.id)
            dispatch(filterBlogs(blog.id))
        } catch (err) {
            console.log(err)
        }
    }
}

export default blogSlice.reducer