import axios  from "axios"
const url = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const addPerson = (data) => {
    const request = axios.post(url,data)
    return request.then(response => response.data)
}

const update = (id ,data) =>{
    const request = axios.put(`${url}/${id}`,data)
    return request.then(response => response.data)
}


const deletePerson = (id) =>{
    const request = axios.delete(`${url}/${id}`)
    return  request.then(response => response.data)
}

export default {getAll, addPerson, deletePerson, update}