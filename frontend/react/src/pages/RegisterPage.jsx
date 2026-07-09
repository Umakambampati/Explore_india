import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = () => {
    if (!username || !password) {
      setError('Username and password are required!')
      return
    }

    api.post('/register/', { username, password, email })
      .then(() => {
        alert('Account created! Please login.')
        navigate('/login')
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'Something went wrong!')
      })
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
      <p className="text-gray-500 mb-8">Join Explore India today</p>

      {error && (
        <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="w-full border rounded-lg px-4 py-2 outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full border rounded-lg px-4 py-2 outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full border rounded-lg px-4 py-2 outline-none"
        />
      </div>

      <button
        onClick={handleRegister}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition"
      >
        Create Account
      </button>

      <p className="text-center text-gray-500 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-orange-500 hover:underline">Login</Link>
      </p>
    </div>
  )
}

export default RegisterPage