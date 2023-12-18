import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const createAnecdote = async (newNote) => {
    const res = await axios.post(baseUrl, newNote)
    return res.data
}

export const updateAnecdote = async updatedAnecdote => {
    const res = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return res.data
}