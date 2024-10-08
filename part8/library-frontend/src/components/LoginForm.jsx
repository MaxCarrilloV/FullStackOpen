import { useState, useEffect } from 'react'
import { LOGIN, BookByFavorite } from '../queries'
import { useMutation } from '@apollo/client'
const LoginForm = ({ setError, setToken, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login, result  ] = useMutation(LOGIN,{
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if(result.data){
      const token = result.data.login.value
      const favoriteGenre = result.data.login.favoriteGenre
      setToken(token)
      localStorage.setItem('token',token)
      localStorage.setItem('favoriteGenre',favoriteGenre)
    }
  },[result.data])

  const onLogin = (event) => {
    event.preventDefault()
    login({variables:{username,password}})
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <form onSubmit={onLogin}>
        <div>
          Username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default LoginForm
