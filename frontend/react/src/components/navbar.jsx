import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('access_token')

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/')
  }

  return (
    <nav className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-orange-500">
        Explore India
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-600 hover:text-orange-500">Home</Link>
        <Link to="/search" className="text-gray-600 hover:text-orange-500">Search</Link>
        <Link to="/trip-planner" className="text-gray-600 hover:text-orange-500">Trip Planner</Link>

        {token ? (
          <button
            onClick={handleLogout}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar