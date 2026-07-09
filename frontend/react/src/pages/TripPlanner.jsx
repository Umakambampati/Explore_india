import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

function TripPlannerPage() {
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [days, setDays] = useState(3)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [itinerary, setItinerary] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/states/')
      .then((response) => {
        setStates(response.data)
      })
  }, [])

  const generateItinerary = () => {
    if (!selectedState) {
      alert('Please select a state!')
      return
    }

    setLoading(true)

    let url = `/places/?state=${selectedState}`
    if (selectedCategory) {
      url += `&category=${selectedCategory}`
    }

    api.get(url)
      .then((response) => {
        const places = response.data
        const placesPerDay = 3
        const generatedDays = []

        for (let day = 0; day < days; day++) {
          const start = day * placesPerDay
          const end = start + placesPerDay
          const todaysPlaces = places.slice(start, end)

          if (todaysPlaces.length > 0) {
            generatedDays.push({
              day: day + 1,
              places: todaysPlaces
            })
          }
        }

        setItinerary(generatedDays)
        setLoading(false)
      })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Trip Planner</h1>
      <p className="text-gray-500 mb-8">Plan your perfect India trip</p>

      {/* Form */}
      <div className="border rounded-xl p-6 mb-8 shadow-sm">

        {/* State Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select State *
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 outline-none"
          >
            <option value="">-- Select a State --</option>
            {states.map((state) => (
              <option key={state.id} value={state.slug}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Days */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Days *
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="w-full border rounded-lg px-4 py-2 outline-none"
          />
        </div>

        {/* Interest/Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interest (Optional)
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 outline-none"
          >
            <option value="">-- All Places --</option>
            <option value="heritage">Heritage</option>
            <option value="beach">Beach</option>
            <option value="nature">Nature</option>
            <option value="spiritual">Spiritual</option>
            <option value="wildlife">Wildlife</option>
            <option value="adventure">Adventure</option>
          </select>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateItinerary}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition"
        >
          {loading ? 'Generating...' : 'Generate My Trip Plan'}
        </button>

      </div>

      {/* Generated Itinerary */}
      {itinerary.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Trip Plan</h2>
          {itinerary.map((dayPlan) => (
            <div key={dayPlan.day} className="mb-6">
              <h3 className="text-lg font-medium text-orange-500 mb-3">
                Day {dayPlan.day}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {dayPlan.places.map((place) => (
  <Link key={place.id} to={`/place/${place.slug}`}>
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      {place.image && (
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-32 object-cover"
        />
      )}
      <div className="p-3">
        <h4 className="font-medium">{place.name}</h4>
        <p className="text-sm text-orange-400 capitalize">{place.category}</p>
        <p className="text-xs text-gray-500 mt-1">{place.famous_for}</p>
      </div>
    </div>
  </Link>
))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {itinerary.length === 0 && !loading && selectedState && (
        <p className="text-gray-500 text-center py-8">
          No places found for selected filters. Try different interests!
        </p>
      )}

    </div>
  )
}

export default TripPlannerPage