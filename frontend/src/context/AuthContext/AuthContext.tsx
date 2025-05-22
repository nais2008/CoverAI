import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"

import {
  AuthContextType,
  AuthTokens,
  User,
  DecodedToken,
} from "../../types/Auth"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")!)
      : null
  )

  const [user, setUser] = useState<User | null>(() =>
    localStorage.getItem("authTokens")
      ? extractUserFromToken(JSON.parse(
        localStorage.getItem("authTokens")!
      ).access)
      : null
  )

  const [loading, setLoading] = useState(true)

  function extractUserFromToken(token: string): User {
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token)
    return {
      username: decoded.username,
      email: decoded.email,
      is_staff: decoded.is_staff,
      first_name: decoded.first_name ?? "",
      last_name: decoded.last_name ?? "",
      image: decoded.image ?? "",
    }
  }

  const loginUser = async (data: { username: string; password: string }) => {
    const response = await fetch(
      "http://localhost:8000/api/v1/users/token/",
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      },
    )

    const resData = await response.json()

    if (response.status === 200) {
      setAuthTokens(resData)
      setUser(extractUserFromToken(resData.access))
      localStorage.setItem("authTokens", JSON.stringify(resData))
      navigate("/")
    } else {
      alert("Error login. Check username or password")
    }
  }

  const logoutUser = useCallback(() => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem("authTokens")
    navigate("/login")
  }, [navigate])

  const updateToken = useCallback(async () => {
    if (!authTokens?.refresh) {
      if (loading) setLoading(false)
      return
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/token/refresh",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: authTokens.refresh }),
        },
      )

      const data = await response.json()

      if (response.status === 200) {
        setAuthTokens(data)
        setUser(extractUserFromToken(data.access))
        localStorage.setItem("authTokens", JSON.stringify(data))
      } else {
        logoutUser()
      }
    } catch (err) {
      console.error("Error updating token", err)
      logoutUser()
    }

    if (loading) setLoading(false)
  }, [authTokens, loading, logoutUser])



  useEffect(() => {
    if (loading) updateToken()

    const interval = setInterval(() => {
      if (authTokens) updateToken()
    }, 1000 * 60 * 4)

    return () => clearInterval(interval)
  }, [authTokens, loading, updateToken])

  const contextData: AuthContextType = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

export default AuthContext
