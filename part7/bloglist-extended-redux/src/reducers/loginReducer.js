import { createSlice } from '@reduxjs/toolkit'
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from './notificationReducer';

const loginSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        setUser(state, action) { return action.payload },
        logOut(state, action) { return null }
    }
})

export const { setUser, logOut } = loginSlice.actions

export const getUserFromLocal = () => {
    return dispatch => {
        const userFromLocal = window.localStorage.getItem("user");
        if (userFromLocal) {
            const userParsed = JSON.parse(userFromLocal);
            dispatch(setUser(userParsed));
            blogService.setToken(userParsed.token);
        }
    }
}

export const loginUser = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({ username, password });
            window.localStorage.setItem("user", JSON.stringify(user));
            blogService.setToken(user.token);
            dispatch(setUser(user))
        } catch (err) {
            const errorMsg = err.response?.data?.error
                ? err.response?.data?.error
                : "Wrong credentials";
            dispatch(setNotification("error", errorMsg, 5));
        }
    }
}

export const logOutUser = () => {
    return dispatch => {
        dispatch(logOut())
        localStorage.removeItem('user')
    }
}

export default loginSlice.reducer