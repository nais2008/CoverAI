import { Routes, Route } from 'react-router-dom'

import MainPage from "./pages/MainPage"
import Navigation from './components/Navigation'


function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={ <MainPage /> }></Route>
      </Routes>
    </>
  )
}

export default App
