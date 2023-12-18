import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) { return action.payload },
    updateAnecdotes(state, action) {
      const filteredState = state.filter(anecdote => anecdote.id !== action.payload.id)
      return [...filteredState, action.payload]
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    try {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    try {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(appendAnecdote(newAnecdote))
    } catch (err) {
      console.log(err)
    }

  }
}

export const addVote = anecdote => {
  return async dispatch => {
    try {
      const anecdoteUpdated = await anecdoteService.increaseVotes(anecdote)
      dispatch(updateAnecdotes(anecdoteUpdated))
    } catch (err) {
      console.log(err)
    }
  }
}

export default anecdoteSlice.reducer