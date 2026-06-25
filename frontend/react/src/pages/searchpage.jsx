import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)

  const handleSearch = () => {
    if (!query) return
    api.get(`/search/?q=${query}`)
      .then((response) => {
        setResults(response.data)
      })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Explore India</h1>

      {/* Search Input */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search states, places, food..."
          className="flex-1 border rounded-lg px-4 py-2 outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Search
        </button>
      </div>

      {/* Results */}
      {results && (
        <div>
          {/* States Results */}
          {results.states.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">States</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {results.states.map((state) => (
                  <Link key={state.id} to={`/state/${state.slug}`}>
                    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                      <h3 className="font-medium">{state.name}</h3>
                      <p className="text-sm text-gray-500">{state.capital}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Places Results */}
          {results.places.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Places</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {results.places.map((place) => (
                  <Link key={place.id} to={`/place/${place.slug}`}>
                    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                      <h3 className="font-medium">{place.name}</h3>
                      <p className="text-sm text-orange-400 capitalize">{place.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {results.states.length === 0 && results.places.length === 0 && (
            <p className="text-gray-500">No results found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchPage