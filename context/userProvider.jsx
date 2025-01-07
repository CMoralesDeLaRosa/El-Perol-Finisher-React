import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUserDataFromLocalStorage = () => {
    const storedUser = JSON.parse(localStorage.getItem('userData'))
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedUser._id) {
      setUserData(storedUser)
    }
    if (storedToken) {
      setToken(storedToken)
    }
  }

  const updateUserData = (newUserData) => {
    setUserData(newUserData)
    localStorage.setItem('userData', JSON.stringify(newUserData))
  }

  const updateToken = (newToken) => {
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }

  useEffect(() => {
    loadUserDataFromLocalStorage()

    setLoading(false)

    const handleStorageChange = (event) => {
      if (event.key === 'userData' || event.key === 'token') {
        loadUserDataFromLocalStorage()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{ userData, token, loading, updateUserData, updateToken }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
