import axios from 'axios'
const url = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(url).then(res => res.data)
export const postAnecdote = (data) => axios.post(url,data).then(res => res.data)
export const putAnecdote = (data) => axios.put(`${url}/${data.id}`,data)