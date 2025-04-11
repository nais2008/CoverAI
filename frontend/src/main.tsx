import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App.tsx'

import { setupStore } from './store/index.ts'

import './index.scss'

const store = setupStore()


createRoot(document.getElementById('root')!).render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
