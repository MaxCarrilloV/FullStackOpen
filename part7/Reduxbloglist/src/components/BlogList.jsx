import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { deleteBlog, upBlog, addBlog } from '../reducers/blogReducer'
import { newNotification } from '../reducers/notificationReducer'
import { deleteLogin } from '../reducers/loginReducer'
import Blog from './Blog'
import Toggable from './Toggable'
import BlogForm from './BlogForm'
const BlogList = ({ user }) => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const removeBlog = (blogdel) => {
    try {
      if (window.confirm(`Remove blog ${blogdel.title} by ${blogdel.author}`)) {
        dispatch(deleteBlog(blogdel))
        dispatch(
          newNotification({
            text: `blog ${blogdel.title} is deleted`,
            style: 'exists',
          })
        )
      }
    } catch (error) {
      dispatch(newNotification({ text: 'Wrong credential', style: 'error' }))
    }
  }
  const updateBlog = (blogup) => {
    dispatch(upBlog(blogup))
  }
  const createBlog = async (Newblog) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(addBlog(Newblog))
      dispatch(
        newNotification({
          text: `A new blog ${Newblog.title} by ${Newblog.author} added`,
          style: 'exists',
        })
      )
    } catch (error) {
      dispatch(newNotification({ text: 'Wrong credential', style: 'error' }))
    }
  }
  const handleLogout = () => {
    dispatch(deleteLogin())
  }
  return (
    <div>
      <h1>Blogs</h1>
      <p>
        {user.name} logged in
        <button onClick={() => handleLogout()}>Logout</button>
      </p>
      <Toggable buttonlabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog}></BlogForm>
      </Toggable>
      {[...blogs]
        .sort((x, y) => y.likes - x.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
    </div>
  )
}
export default BlogList
