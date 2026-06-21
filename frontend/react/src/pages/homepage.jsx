import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

function HomePage() {
  const [states, setStates] = useState([])

  useEffect(() => {
    api.get('/states/')
      .then((response) => {
        setStates(response.data)
      })
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800">Discover Incredible India</h1>
        <p className="text-gray-500 mt-2">Explore states, places, food and more</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured States</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {states.map((state) => (
            <Link key={state.id} to={`/state/${state.slug}`}>
              <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-medium">{state.name}</h3>
                <p className="text-sm text-gray-500">{state.capital}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage