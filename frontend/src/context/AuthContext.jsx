import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import api, { setToken, getStoredUser, setStoredUser } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setToken(data.token)
    const u = {
      id: data.userId,
      email: data.email,
      name: data.name,
      role: data.role,
    }
    setStoredUser(u)
    setUser(u)
    return u
  }

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password })
    setToken(data.token)
    const u = {
      id: data.userId,
      email: data.email,
      name: data.name,
      role: data.role,
    }
    setStoredUser(u)
    setUser(u)
    return u
  }

  const logout = () => {
    setToken(null)
    setStoredUser(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user,
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
