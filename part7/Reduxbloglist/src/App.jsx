import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { initialBlogs } from './reducers/blogReducer'
import { initialUser, newLogin } from './reducers/loginReducer'
const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(newLogin({ username, password }))
    setUsername('')
    setPassword('')
  }
  useEffect(() => {
    dispatch(initialUser())
    dispatch(initialBlogs())
  }, [])

  return (
    <div>
      <Notification></Notification>
      {user === null ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        ></LoginForm>
      ) : (
        <BlogList user={user}></BlogList>
      )}
    </div>
  )
}

export default App
