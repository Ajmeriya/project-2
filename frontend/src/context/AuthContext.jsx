import { createContext } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  return children
}

export default AuthContext

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
