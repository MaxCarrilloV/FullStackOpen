import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { newNotification } from './notificationReducer'
const loginSlice = createSlice({
  name: 'login',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    userLogin(state, action) {
      return action.payload
    },
    userLogout() {
      return null
    },
  },
})
export const { setUser, userLogin, userLogout } = loginSlice.actions
export const initialUser = () => {
  return (dispatch) => {
    const userLog = window.localStorage.getItem('user')
    if (userLog) {
      const user = JSON.parse(userLog)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}
export const newLogin = (user) => {
  return async (dispatch) => {
    try {
      const userLog = await loginService.login(user)
      dispatch(setUser(userLog))
      window.localStorage.setItem('user', JSON.stringify(userLog))
      blogService.setToken(userLog.token)
    } catch {
      dispatch(newNotification({ text: 'Wrong credential', style: 'error' }))
    }
  }
}
export const deleteLogin = () => {
  return (dispatch) => {
    window.localStorage.removeItem('user')
    dispatch(userLogout())
  }
}
export default loginSlice.reducer
