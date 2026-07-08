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

      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-800">
          Discover <span className="text-orange-500">Incredible India</span>
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Explore 28 states · 500+ destinations · Local food · Festivals
        </p>
      </section>

      {/* States Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Explore States</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {states.map((state) => (
            <Link key={state.id} to={`/state/${state.slug}`}>
              <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
                {state.banner_image && (
                  <img
                    src={state.banner_image}
                    alt={state.name}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-800">{state.name}</h3>
                  <p className="text-sm text-gray-500">{state.capital}</p>
                  <p className="text-xs text-orange-400 mt-1">{state.famous_for}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}

export default HomePage