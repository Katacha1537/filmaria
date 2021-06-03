import axios from 'axios'

//https://sujeitoprogramador.com (baseURL)
//r-api/?api=filmes (todos os filmes)
//r-api/?api=filmes/123 (Filme com ID 123)

const api = axios.create({
  baseURL: 'https://sujeitoprogramador.com'
})

export default api