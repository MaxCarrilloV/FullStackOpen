import { useState, useEffect, useContext } from 'react'
import { useNotificatioDispatch } from './NotificationContext'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from './services/users'
import { Routes, Route, useMatch } from 'react-router-dom'
import { setToken, getAll } from './services/blogs'
import loginContext from './LoginContext'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import NavBarMenu from './components/NavBarMenu'
import UserList from './components/UserList'
import User from './components/User'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, logindispatch] = useContext(loginContext)
  const Notidispatch = useNotificatioDispatch()
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')
  useEffect(() => {
    const userLog = window.localStorage.getItem('user')
    if (userLog) {
      const user = JSON.parse(userLog)
      logindispatch({ type: 'newLogin', payload: user })
      setToken(user.token)
    }
  }, [])

  const resultUser = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const resultBlogs = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
  })

  if (resultUser.isLoading) {
    return <div>loading data...</div>
  }

  if (resultUser.isError) {
    return <div>Error data...</div>
  }
  const users = resultUser.data

  if (resultBlogs.isLoading) {
    return <div>loading data...</div>
  }

  if (resultBlogs.isError) {
    return <div>Error data...</div>
  }
  const blogs = resultBlogs.data

  const userData = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null
    
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      setToken(user.token)
      setUsername('')
      setPassword('')
      logindispatch({ type: 'newLogin', payload: user })
    } catch (exception) {
      const data = { text: 'Wrong credentials', style: 'error' }
      Notidispatch({ type: 'setNotification', payload: data })
      setTimeout(() => {
        Notidispatch({ type: 'hideNotification' })
      }, 5000)
    }
  }
  

  return (
    <div>
      <Notification />
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
          <NavBarMenu user={user} />
          <Routes>
            <Route
              path="/"
              element={<BlogList blogs={blogs} user={user}></BlogList>}
            />
            <Route
              path="/users"
              element={<UserList users={users}></UserList>}
            />
            <Route
              path="/users/:id"
              element={<User userData={userData}></User>}
            />
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  blog={blog}
                  user={user}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
