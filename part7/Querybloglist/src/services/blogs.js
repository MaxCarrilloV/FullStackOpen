import axios from 'axios'
const baseUrl = '/api/blogs'

let Token = null

export const setToken = (newToken) => {
  Token = `Bearer ${newToken}`
}

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const create = async blog => {

  const config = {
    headers: { Authorization: Token }
  }

  const res = await axios.post(baseUrl,blog,config)
  return res.data
}

export const update = async blog => {
  const res = await axios.put(`${baseUrl}/${blog.id}`,blog)
  return res.data
}

export const addComment = async blog => {
  const res = await axios.post(`${baseUrl}/${blog.id}/comments`,blog)
  return res.data
}

export const remove = async id => {
  const config = {
    headers: { Authorization: Token },
  }
  const res = await axios.delete(`${baseUrl}/${id}`,config)
  if(res.status === 204){
    return id
  }
  return res.data
}

