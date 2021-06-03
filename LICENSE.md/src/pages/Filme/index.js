import {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {toast} from 'react-toastify'

import './style.css'

import api from '../../services/api'

export default function Filne(){
  const { id } = useParams()
  const history = useHistory()

  const [filme, setFilme] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function loadFilmes(){
      const response = await api.get(`r-api/?api=filmes/${id}`)

      if(response.data.length === 0){
        history.replace('/')
        return;
      }
      setFilme(response.data)
      setLoading(false)
    }

    loadFilmes()
    return()=>{
    }
  },[id, history])

  if(loading){
    return(
      <div className="filme-indo">
        <h1>carregando...</h1>
      </div>
    )
  }

  function handleSalvaFilme(){
    const minhaLista = localStorage.getItem('filmes')

    let filmesSalvos = JSON.parse(minhaLista) || []

    const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)

    if(hasFilme){
      toast.info('Você já possui esse filme salvo.')
      return
    }

    filmesSalvos.push(filme)
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos))
    toast.success('filme salvo com sucesso!')
  }

  return(
    <div className="filme-info">
      <h1>{filme.nome}</h1>
      <img src={filme.foto} alt={filme.nome}/>

      <h3>Sinopse</h3>
      {filme.sinopse}

      <div className="botoes">
        <button onClick={handleSalvaFilme}>Salvar</button>
        <button>
          <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}