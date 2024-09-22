import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    voteAnecdote(state,action){
      const id = action.payload.id
      const changeAnec = action.payload
      return state.map(anec => anec.id !== id ? anec: changeAnec)
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdote(state,action){
      return action.payload
    }
  }
})
export const { voteAnecdote, appendAnecdote, setAnecdote } = anecdoteSlice.actions
export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}
export const addAnecdote = (content) => {
  return async dispatch => {
    dispatch(appendAnecdote(newAnecdote))
    const newAnecdote = await anecdoteService.create(content)
  }
}
export const upAnecdote = (id) =>{
  return async dispatch => {
    const anecdote = await anecdoteService.update(id)
    dispatch(voteAnecdote(anecdote))
  }
}
export default anecdoteSlice.reducer