import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const create = newObject => {
    const request = axios.post(baseUrl,newObject)
    
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const deletePerson = () => {

}


const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
  }

export default {
    getAll,
    create,
    update
}