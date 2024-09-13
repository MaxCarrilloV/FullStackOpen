import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [error, setError] = useState('exists')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setError('error')
      setTimeout(() => {
        setErrorMessage(null)
        setError('exists')
      }, 5000)
  }}

  const updateBlog = (blogup) => {
    blogService.update(blogup).then((blogup) => {
      setBlogs(blogs.map((b) => (b.id !== blogup.id ? b : blogup)))
    })
  }

  const createBlog = async (Newblog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create(Newblog)
      setBlogs(blogs.concat(blog))
      setErrorMessage(`A new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setErrorMessage('')
        setError('exists')
      }, 5000)
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setError('error')
      setTimeout(() => {
        setErrorMessage('')
        setError('exists')
      }, 5000)
  }}

  const removeBlog = (blogdel) => {
    try {
      if (window.confirm(`Remove blog ${blogdel.title} by ${blogdel.author}`)) {
        blogService.remove(blogdel.id)
        setBlogs(blogs.filter((b) => b.id !== blogdel.id))
        setErrorMessage(`blog ${blogdel.title} is deleted`)
        setError('exists')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setError('error')
      setTimeout(() => {
        setErrorMessage(null)
        setError('exists')
      }, 5000)
    }}

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  useEffect(() => {
    const userLog = window.localStorage.getItem('user')
    if (userLog) {
      const user = JSON.parse(userLog)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Notification message={errorMessage} isError={error} />
      {user === null ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        ></LoginForm>
      ) : (
        <div>
          <h1>Blogs</h1>
          <p>
            {user.name} logged in
            <button onClick={() => handleLogout()}>Logout</button>
          </p>
          <Toggable buttonlabel='New blog' ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog}
            ></BlogForm>
          </Toggable>
          {blogs && blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App