import { Routes, Route } from 'react-router-dom'

import MainPage from './pages/MainPage'
import APIPage from './pages/APIPage'


import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={ <MainPage /> }></Route>
          <Route path="/api" element={ <APIPage /> }></Route>
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
