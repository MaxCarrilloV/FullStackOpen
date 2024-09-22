import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { newNotification  } from '../reducers/notificationReducer'
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(newNotification(`Add anecdote ${content}`,5))
  }

  return (
    <form onSubmit={createAnecdote}>
      <h2>create new</h2>
      <div>
        <input name='anecdote' />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}
export default AnecdoteForm