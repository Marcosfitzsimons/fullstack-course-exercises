import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: '',
    message: ''
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNewNotification(state, action) {
            console.log(action.payload)
            const { message, type } = action.payload
            return {
                type,
                message
            }
        },
        removeNotification(state, action) {
            return {
                type: '',
                message: ''
            }
        }
    }
})

export const { setNewNotification, removeNotification } = notificationSlice.actions

export const setNotification = (type, message, seconds) => {
    const newNotification = { type, message }
    const ml = seconds * 1000
    return dispatch => {
        dispatch(setNewNotification(newNotification))
        setTimeout(() => {
            dispatch(removeNotification())
        }, ml)
    }
}

export default notificationSlice.reducer