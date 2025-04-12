import { Routes, Route } from 'react-router-dom'

import MainPage from "./pages/MainPage"

import Header from './components/Header'


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={ <MainPage /> }></Route>
        </Routes>
      </main>
    </>
  )
}

export default App
