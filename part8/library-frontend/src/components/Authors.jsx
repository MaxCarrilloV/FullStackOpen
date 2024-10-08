import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { AllAuthors,Edit_Author } from '../queries'
import Select from 'react-select'
const Authors = (props) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const result = useQuery(AllAuthors)
  const [ ChangeBorn ] = useMutation(Edit_Author,{
    refetchQueries:[{query:AllAuthors}],
  })
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  const editYear =async (event) => {
    event.preventDefault() 
    ChangeBorn({variables:{name:selectedOption.value,born: parseInt(born,10)}})
    setBorn('')
    setSelectedOption(null)
  }
  const options = []
  for(const author of authors){
    const name = author.name
    options.push({value:name,label:name})
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={editYear}>
        <div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          Born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default Authors
