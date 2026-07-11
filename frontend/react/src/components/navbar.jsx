import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('access_token')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className="bg-white border-b px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500">
          🇮🇳 Explore India
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-orange-500 text-sm">Home</Link>
          <Link to="/search" className="text-gray-600 hover:text-orange-500 text-sm">Search</Link>
          <Link to="/trip-planner" className="text-gray-600 hover:text-orange-500 text-sm">Trip Planner</Link>
          <Link to="/ai-chat" className="text-gray-600 hover:text-orange-500 text-sm">AI Assistant</Link>

          {token ? (
            <button
              onClick={handleLogout}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 transition text-sm">
                Login
              </Link>
              <Link to="/register" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 pb-4 border-t pt-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-orange-500">Home</Link>
          <Link to="/search" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-orange-500">Search</Link>
          <Link to="/trip-planner" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-orange-500">Trip Planner</Link>
          <Link to="/ai-chat" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-orange-500">AI Assistant</Link>

          {token ? (
            <button
              onClick={handleLogout}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm text-left"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg text-sm text-center">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm text-center">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar