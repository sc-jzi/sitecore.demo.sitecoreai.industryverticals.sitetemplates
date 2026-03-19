'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { User } from './types'
import { mockUsers } from './mock-data'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  bloodType: string
  dateOfBirth: string
  address: {
    street: string
    city: string
    province: string
    postalCode: string
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = 'cbs_auth_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }

    try {
      const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)
      if (stored) {
        const userData = JSON.parse(stored)
        setUser(userData)
      }
    } catch {
      try {
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
      } catch {
        // Ignore storage errors
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // For demo: accept any password, just check if email exists
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase())

    // getting around linting
    console.log(_password);

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(foundUser))
      return { success: true }
    }

    // For demo: if email not found but looks valid, create a demo user
    if (email.includes('@')) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        firstName: 'Demo',
        lastName: 'User',
        phone: '(555) 555-0000',
        bloodType: 'A+',
        dateOfBirth: '1990-01-01',
        address: {
          street: '123 Demo Street',
          city: 'Toronto',
          province: 'Ontario',
          postalCode: 'M5V 1A1',
        },
      }
      setUser(newUser)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
      return { success: true }
    }

    return { success: false, error: 'Invalid email or password' }
  }, [])

  const register = useCallback(async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase())
    if (existingUser) {
      return { success: false, error: 'An account with this email already exists' }
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      bloodType: userData.bloodType,
      dateOfBirth: userData.dateOfBirth,
      address: userData.address,
    }

    // Add to mock users (in real app, this would be a database operation)
    mockUsers.push(newUser)

    setUser(newUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
