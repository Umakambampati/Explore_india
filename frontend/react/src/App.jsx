



import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './pages/navbar'
import Footer from './pages/footer'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App