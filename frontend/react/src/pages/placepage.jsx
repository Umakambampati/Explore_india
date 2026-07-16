import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'

function PlacePage() {
  const { slug } = useParams()
  const [place, setPlace] = useState(null)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const token = localStorage.getItem('access_token')

  useEffect(() => {
    api.get(`/places/${slug}/`)
      .then((response) => setPlace(response.data))

    api.get(`/places/${slug}/reviews/`)
      .then((response) => setReviews(response.data))
  }, [slug])

  const handleReviewSubmit = () => {
    if (!body) {
      setError('Please write a review!')
      return
    }

    api.post(
      `/places/${slug}/add-review/`,
      { rating, body },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        setReviews([...reviews, response.data])
        setBody('')
        setRating(5)
        setError('')
        setSuccess('Review added successfully!')
      })
      .catch(() => {
        setError('Something went wrong. Please try again!')
      })
  }

  if (!place) {
    return <p className="text-center py-12">Loading...</p>
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Hero Image */}
      {place.image && (
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-72 object-cover rounded-xl mb-8"
        />
      )}

      {/* Place Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

        {/* Left Column */}
        <div>
          <span className="text-sm text-orange-500 capitalize bg-orange-50 px-3 py-1 rounded-full">
            {place.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-800 mt-3 mb-3">{place.name}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{place.description}</p>
        </div>

        {/* Right Column — Quick Info */}
        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Info</h3>

          <div className="flex items-start gap-3">
            <span className="text-orange-500">🕐</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Timings</p>
              <p className="text-sm text-gray-500">{place.timings}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-orange-500">🎟️</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Entry Fee</p>
              <p className="text-sm text-gray-500">{place.entry_fee}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-orange-500">⏱️</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Visit Duration</p>
              <p className="text-sm text-gray-500">{place.visit_duration}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-orange-500">📅</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Best Time to Visit</p>
              <p className="text-sm text-gray-500">{place.best_time}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-orange-500">⭐</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Famous For</p>
              <p className="text-sm text-gray-500">{place.famous_for}</p>
            </div>
          </div>

          {/* AI Trip Planner Button */}
          <Link
            to="/trip-planner"
            className="block w-full text-center bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-medium mt-4"
          >
            🗺️ Plan a Trip Here
          </Link>

        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>

        {/* Existing Reviews */}
        {reviews.length === 0 ? (
          <p className="text-gray-400 mb-6">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-4 mb-8">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{review.username}</span>
                  <span className="text-orange-500">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="text-gray-600">{review.body}</p>
                <p className="text-xs text-gray-400 mt-2">{review.created_at}</p>
              </div>
            ))}
          </div>
        )}

        {/* Write Review Form */}
        {token ? (
          <div className="border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Write a Review</h3>

            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-500 px-4 py-3 rounded-lg mb-4">
                {success}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full border rounded-lg px-4 py-2 outline-none"
              >
                <option value={5}>⭐⭐⭐⭐⭐ — Excellent</option>
                <option value={4}>⭐⭐⭐⭐ — Good</option>
                <option value={3}>⭐⭐⭐ — Average</option>
                <option value={2}>⭐⭐ — Poor</option>
                <option value={1}>⭐ — Terrible</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className="w-full border rounded-lg px-4 py-2 outline-none resize-none"
              />
            </div>

            <button
              onClick={handleReviewSubmit}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition"
            >
              Submit Review
            </button>
          </div>
        ) : (
          <div className="border rounded-xl p-6 text-center">
            <p className="text-gray-500 mb-4">Please login to write a review</p>
            <Link
              to="/login"
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Login
            </Link>
          </div>
        )}
      </div>

      {/* Back Button */}
      <Link to="/" className="text-orange-500 hover:underline text-sm mt-8 block">
        ← Back to Home
      </Link>

    </div>
  )
}

export default PlacePage