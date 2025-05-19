import { createContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  let [ authToken, setAuthToken ] = useState(null)
  let [ user, setUser ] = useState(null)

  const loginUser = async (e) => {
    e.preventDefault()

    let response = fetch(
      "http://localhost:8000/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": e.target.username.value,
          "password": e.target.password.value,
        })
      }
    )

    const data = (await response).json()

    if ((await response).status == 200){
      setAuthToken(await data)
      setUser((await data).access)
    }
  }

  let contextData = {
    loginUser: loginUser,
  }

  return (
    <AuthContext.Provider value={{ "name": "nick",  }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext
