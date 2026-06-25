import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
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
    return <p className="text-center py-12">Loading...</p>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* State Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{state.name}</h1>
        <p className="text-gray-500 mt-1">{state.capital} · {state.region} India</p>
        <p className="text-gray-600 mt-3">{state.description}</p>
        <p className="text-sm text-orange-500 mt-2">Best time to visit — {state.best_season}</p>
      </div>

      {/* Places Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Places to Visit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {state.places.map((place) => (
            <Link key={place.id} to={`/place/${place.slug}`}>
              <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-medium">{place.name}</h3>
                <p className="text-sm text-orange-400 capitalize">{place.category}</p>
                <p className="text-sm text-gray-500 mt-1">{place.famous_for}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Foods Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Local Food</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {state.foods.map((food) => (
            <div key={food.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium">{food.name}</h3>
              <p className="text-sm text-orange-400">{food.category}</p>
              <p className="text-sm text-gray-500 mt-1">{food.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Events & Festivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {state.events.map((event) => (
            <div key={event.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium">{event.name}</h3>
              <p className="text-sm text-gray-500">{event.location}</p>
              <p className="text-sm text-orange-400 mt-1">{event.date_start}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default StatePage