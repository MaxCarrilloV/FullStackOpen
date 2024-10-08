import { useEffect, useState } from 'react'
import { BookByFavorite } from '../queries'
import { useLazyQuery } from '@apollo/client'
const Recommend = (props) => {
  
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('')
  const [getBook, result] = useLazyQuery(BookByFavorite)
  useEffect(() => {
    const genre = localStorage.getItem('favoriteGenre')
    setGenre(genre)
    getBook({ variables: { genre: genre } })  
  }, [])

  useEffect(() =>{
    if(result.data){
        setBooks(result.data.allBooks)
    }
  },[result])
  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre {genre}</p>
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
    </div>
  )
}
export default Recommend
