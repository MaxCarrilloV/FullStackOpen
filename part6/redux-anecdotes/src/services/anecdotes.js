import axios from 'axios'
const url = 'http://localhost:3001/anecdotes'

const getAll = async () =>{
    const res = await axios.get(url)
    return res.data
}

const create = async(content) => {
    const object = { content , votes:0 }
    const res = await axios.post(url,object)
    return res.data
}

const update = async(id) => {
    const response = await axios.get(`${url}/${id}`)
    const anecdote = response.data
    const upAnecdote = {
        ...anecdote,
        votes:anecdote.votes+1
    }
    const res = await axios.put(`${url}/${id}`,upAnecdote)
    return res.data
}

export default { getAll, create, update }