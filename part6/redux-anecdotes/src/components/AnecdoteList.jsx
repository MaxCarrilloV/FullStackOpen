import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) =>
    filter === null
      ? anecdotes
      : anecdotes.filter((anec) => anec.content.includes(filter))
  )
  const dispatch = useDispatch();
  
  const vote = (id) => {
    dispatch(voteAnecdote(id));
  }

  return (
    <div>
      {anecdotes.sort((x,y) => y.votes - x.votes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
