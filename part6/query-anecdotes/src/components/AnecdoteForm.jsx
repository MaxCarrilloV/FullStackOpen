import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificatioDispatch } from '../notificationContext'
import { postAnecdote  } from '../services/anecdotes'
const AnecdoteForm = () => {
  const dispatch = useNotificatioDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn:postAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],anecdotes.concat(newAnecdote))
    },
    onError: () => {
      const message = `error content length is to small`
      dispatch({type:'ShowNotification', payload:message})
      setTimeout(() => {
        dispatch({type:'hideNotification'})
      },5000)
    }
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(({content,votes:0}))
    const message = `Add anecdote ${content}`
    dispatch({type:'ShowNotification', payload:message})
    setTimeout(() => {
      dispatch({type:'hideNotification'})
    },5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
