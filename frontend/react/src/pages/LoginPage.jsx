import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!username || !password) {
      setError('Username and password are required!')
      return
    }

    api.post('/token/', { username, password })
      .then((response) => {
        localStorage.setItem('access_token', response.data.access)
        localStorage.setItem('refresh_token', response.data.refresh)
        navigate('/')
      })
      .catch(() => {
        setError('Invalid username or password!')
      })
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
      <p className="text-gray-500 mb-8">Login to Explore India</p>

      {error && (
        <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="w-full border rounded-lg px-4 py-2 outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full border rounded-lg px-4 py-2 outline-none"
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition"
      >
        Login
      </button>

      <p className="text-center text-gray-500 mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="text-orange-500 hover:underline">Register</Link>
      </p>
    </div>
  )
}

export default LoginPage