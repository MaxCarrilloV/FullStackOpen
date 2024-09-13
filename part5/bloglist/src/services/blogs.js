import axios from 'axios'
const baseUrl = '/api/blogs'

let Token = null

const setToken = (newToken) => {
  Token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blog => {

  const config = {
    headers: { Authorization: Token }
  }

  const res = await axios.post(baseUrl,blog,config)
  return res.data
}

const update = async blog => {
  const res = await axios.put(`${baseUrl}/${blog.id}`,blog)
  return res.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: Token },
  }
  const res = await axios.delete(`${baseUrl}/${id}`,config)
  return res.data
}

export default { setToken, getAll, create, update, remove }