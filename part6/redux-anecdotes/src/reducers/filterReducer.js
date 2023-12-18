import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterReducer = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        handleSearchFilter(state, action) {
            const filter = action.payload
            return filter
        }
    }
})

export const { handleSearchFilter } = filterReducer.actions
export default filterReducer.reducer