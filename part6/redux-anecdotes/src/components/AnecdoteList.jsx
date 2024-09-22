import { useSelector, useDispatch } from 'react-redux'
import { upAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) =>
    filter === ''
      ? anecdotes
      : anecdotes.filter((anec) => anec.content.includes(filter))
  )
  const dispatch = useDispatch()
  
  const vote = (anecdote) => {
    const id = anecdote.id
    dispatch(upAnecdote(id));
    dispatch(newNotification(`you voted ${anecdote.content}`,5))
  }

  return (
    <div>
      {[...anecdotes].sort((x,y) => y.votes - x.votes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
