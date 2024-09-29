import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    likeBlog(state, action) {
      const id = action.payload.id
      const changeBlog = action.payload
      return state.map((blog) => (blog.id !== id ? blog : changeBlog))
    },
    removeBlog(state, action) {
      const id = action.payload.id
      return state.filter((blog) => blog.id !== id)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlog(state, action) {
      return action.payload
    },
  },
})
export const { likeBlog, removeBlog, appendBlog, setBlog } = blogSlice.actions
export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlog(blogs))
  }
}
export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}
export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const del = await blogsService.remove(blog.id)
    dispatch(removeBlog(blog))
  }
}
export const upBlog = (blog) => {
  return async (dispatch) => {
    const upBlog = await blogsService.update(blog)
    dispatch(likeBlog(upBlog))
  }
}
export default blogSlice.reducer
