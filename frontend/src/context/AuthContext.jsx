import { createContext, useState } from 'react'
import { authApi } from '../api/authApi'
import { clearAuthSession, getAccessToken, getCurrentUser, setAuthSession } from '../utils/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser)
  const [token, setToken] = useState(getAccessToken)

  const authenticate = async (request) => {
    const response = await request()
    setAuthSession(response)
    setToken(response.token)
    setUser({ userId: response.userId, email: response.email, fullName: response.fullName })
    return response
  }

  const login = (email, password) => authenticate(() => authApi.login({ email, password }))
  const register = (fullName, email, password) =>
    authenticate(() => authApi.register({ fullName, email, password }))

  const logout = () => {
    clearAuthSession()
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: Boolean(token), login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
