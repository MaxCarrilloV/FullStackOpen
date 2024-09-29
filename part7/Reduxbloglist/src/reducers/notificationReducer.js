import { createSlice } from '@reduxjs/toolkit'
const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return ''
    },
  },
})
export const { setNotification, hideNotification } = notificationSlice.actions
export const newNotification = (text) => {
  return (dispatch) => {
    dispatch(setNotification(text))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }
}
export default notificationSlice.reducer
