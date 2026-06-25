import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'

function PlacePage() {
  const { slug } = useParams()
  const [place, setPlace] = useState(null)

  useEffect(() => {
    api.get(`/places/${slug}/`)
      .then((response) => {
        setPlace(response.data)
      })
  }, [slug])

  if (!place) {
    return <p className="text-center py-12">Loading...</p>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Place Header */}
      <div className="mb-8">
        <span className="text-sm text-orange-500 capitalize">{place.category}</span>
        <h1 className="text-4xl font-bold text-gray-800 mt-1">{place.name}</h1>
        <p className="text-gray-500 mt-1">Best time to visit — {place.best_time}</p>
        <p className="text-gray-600 mt-3">{place.description}</p>
        <p className="text-sm text-orange-400 mt-2">Famous for — {place.famous_for}</p>
      </div>

      {/* Back Button */}
      <Link to="/" className="text-orange-500 hover:underline text-sm">
        ← Back to Home
      </Link>

    </div>
  )
}

export default PlacePage