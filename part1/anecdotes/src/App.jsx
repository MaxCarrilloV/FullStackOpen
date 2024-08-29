import { useState } from 'react'
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const onAnecdote = () => setSelected(Math.floor(Math.random()*anecdotes.length))
  const onVotes = () => {
    const copy = [...votes]
    copy[selected] +=1
    setVotes(copy)
  }
  const buscar = () => {
    let index = 0
    if(votes.filter(e => e !== 0).length > 0){
      index = votes.findIndex(element =>element === Math.max(...votes))
    }
    return anecdotes[index]
  }
  return (
    <div>
      <h2>Anécdota del día</h2>
      <p>{anecdotes[selected]}</p>
      <p>Tiene {votes[selected]} votos</p>
      <Button text='Votar' onClick={onVotes}></Button>
      <Button text="Siguiente anécdota" onClick={onAnecdote}></Button>
      <h2>Anécdota con más votos</h2>
      <p>{buscar()}</p>
    </div>
  )
}

export default App