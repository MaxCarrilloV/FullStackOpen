import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificatioDispatch } from './notificationContext'
import { getAnecdotes, putAnecdote } from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificatioDispatch()
  const addVoteMutation = useMutation({
    mutationFn:putAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    const update = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    addVoteMutation.mutate(update)
    const message = `you voted ${update.content}`
    dispatch({type:'ShowNotification', payload:message})
    setTimeout(() => {
      dispatch({type:'hideNotification'})
    },5000)
  }

  const res = useQuery({
    queryKey:['anecdotes'],
    queryFn: getAnecdotes,
    retry:1,
    refetchOnWindowFocus: false
  })
  if(res.isError){
    return <h1>Anecdotes service not available due to problems in server</h1>
  }
  if ( res.isLoading ) {
    return <div>loading data...</div>
  }
  
  
  const anecdotes = res.data
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes?.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
