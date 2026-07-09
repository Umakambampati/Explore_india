import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StatePage from './pages/StatePage'
import PlacePage from './pages/PlacePage'
import SearchPage from './pages/SearchPage'
import TripPlannerPage from './pages/TripPlanner'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/state/:slug" element={<StatePage />} />
        <Route path="/place/:slug" element={<PlacePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/trip-planner" element={<TripPlannerPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App