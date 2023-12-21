import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNewNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const { setNewNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
    const ml = seconds * 1000
    return dispatch => {
        dispatch(setNewNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, ml)
    }
}

export default notificationSlice.reducer