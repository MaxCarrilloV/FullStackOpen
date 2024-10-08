import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, AllBooks, BookByFavorite } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommend from './components/Recommend'

export const updateCache = (cache, query, addedBook) => {
  addedBook.genres.forEach((genre) => {
    try {
      const { allBooks: genreBooks } = cache.readQuery({
        query: BookByFavorite,
        variables: { genre },
      })
      cache.writeQuery({
        query: BookByFavorite,
        variables: { genre },
        data: { allBooks: [...genreBooks, addedBook] },
      })
    } catch (error) {
      console.log(`No se encontró la caché para el género: ${genre}`)
    }
  })

  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, (result) => {
    const allBooks = result?.allBooks || []
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const bookAdded = data.data.bookAdded
      notify(`${bookAdded.title} added`)
      updateCache(client.cache, { query: AllBooks }, bookAdded)

      client.cache.updateQuery({ query: AllBooks }, (result) => {
        const allBooks = result?.allBooks || []
        return {
          allBooks: allBooks.concat(bookAdded),
        }
      })
    },
  })

  useEffect(() => {
    const key = localStorage.getItem('token')
    if (key) {
      setToken(key)
    }
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('genre')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'genre'} />
    </div>
  )
}

export default App
