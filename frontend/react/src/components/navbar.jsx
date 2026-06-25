import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-orange-500">
        Explore India
      </Link>
      <div className="flex gap-6">
        <Link to="/" className="text-gray-600 hover:text-orange-500">Home</Link>
        <Link to="/search" className="text-gray-600 hover:text-orange-500">Search</Link>
      </div>
    </nav>
  )
}

export default Navbar