import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage'
import StatePage from './pages/Statepage'
import PlacePage from './pages/placepage'
import SearchPage from './pages/searchpage'
import TripPlannerPage from './pages/TripPlanner'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/navbar'
import Footer from './components/footer'
import AIChatPage from './pages/AiChatPage'

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
        <Route path="/ai-chat" element={<AIChatPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App