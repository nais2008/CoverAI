import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { AuthProvider } from "./context/AuthContext/AuthContext.tsx"

import App from "./App.tsx"

import "./config/configureMobX.ts"

import "./index.scss"



createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
