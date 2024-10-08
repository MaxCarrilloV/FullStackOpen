import { useQuery, useLazyQuery } from '@apollo/client'
import { AllBooks, BookByFavorite } from '../queries'
import { useEffect, useState } from 'react'
const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])
  const result = useQuery(AllBooks)
  const [bookByGenre, resultByGenre] = useLazyQuery(BookByFavorite)
  const getGenres = (books) => {
    const genresToSet = new Set()
    for (const book of books) {
      for (const genre of book.genres) {
        genresToSet.add(genre)
      }
    }
    setGenres(Array.from(genresToSet))
  }
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if (resultByGenre.data) {
      setBooks(resultByGenre.data.allBooks)
    }
  }, [resultByGenre])

  useEffect(() => {
    if (books.length > 0) {
      getGenres(result.data.allBooks)
    }
  }, [books])

  const OnGenre = (e) => {
    if(e==='ALL'){
      setBooks(result.data.allBooks)
      setGenre(null)
      return 
    }
    setGenre(e)
    bookByGenre({variables:{genre:e}})
  }
  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>books</h2>
      <div>
        <p>{genre ? <span>in genre {genre}</span>:''}</p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {genres.map((e, index) => (
            <button onClick={()=>OnGenre(e)} key={e}>{e}</button>
          ))}
          <button onClick={() => OnGenre('ALL')}>AllGenres</button>
        </div>
      </div>
    </div>
  )
}

export default Books
