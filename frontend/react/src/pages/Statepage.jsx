import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

function StatePage() {
  const { slug } = useParams()
  const [state, setState] = useState(null)

  useEffect(() => {
    api.get(`/states/${slug}/full/`)
      .then((response) => {
        setState(response.data)
      })
  }, [slug])

  if (!state) {
    return <p>Loading...</p>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{state.name}</h1>
      <p className="text-gray-500">{state.description}</p>
    </div>
  )
}

export default StatePage