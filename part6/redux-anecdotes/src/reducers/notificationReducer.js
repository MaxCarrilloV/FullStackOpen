import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name:'notification',
    initialState:'',
    reducers:{
        showNotification(state,action){
            return action.payload
        },
        hideNotification(state,action){
            return ''
        }
    }
})
export const { showNotification, hideNotification } = notificationSlice.actions
export const newNotification = (text, timeout) => {
    return dispatch => {
        dispatch(showNotification(text))
        setTimeout(() => {
            dispatch(hideNotification())
        }, timeout * 1000) 
    }
}
export default notificationSlice.reducer