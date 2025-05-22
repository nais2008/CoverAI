export interface AuthTokens {
  access: string
  refresh: string
}

export interface User {
  username: string
  email: string
  is_staff: boolean
  first_name?: string
  last_name?: string
  image?: string
}

export interface LoginData {
  username: string
  password: string
}

export interface AuthContextType {
  user: User | null
  authTokens: AuthTokens | null
  loginUser: (data: LoginData) => Promise<void>
  logoutUser: () => void
}

export interface DecodedToken {
  username: string
  email: string
  is_staff: boolean
  first_name?: string
  last_name?: string
  image?: string
  exp: number
  iat: number
}
