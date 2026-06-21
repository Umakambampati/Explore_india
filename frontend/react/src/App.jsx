import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StatePage from './pages/StatePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/state/:slug" element={<StatePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App