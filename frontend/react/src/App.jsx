import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StatePage from './pages/StatePage'
import PlacePage from './pages/placepage'
import SearchPage from './pages/searchpage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/state/:slug" element={<StatePage />} />
        <Route path="/place/:slug" element={<PlacePage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App