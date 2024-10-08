import { createContext, useEffect, useState } from 'react'
import Router from 'next/router'
import { setCookie, parseCookies } from 'nookies'

type User = {
  name: string
  login: string
  email: string
  telephone: Number
  avatarUrl: string
  itemsViewed: Array<Object>
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean
  user : User | null | any
  signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children } : any) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  useEffect(() => {
    const { 'infshop.token': token } = parseCookies()

    if (token) {
      fetch('/api/auth/recovery/token',
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({ token: token })
      })
      .then(response => response.json())
      .then(response => {
        response ? setUser(response.user) : null
      })
    }
  },[])

  async function signIn({ email, password }: SignInData) {

    const apiToken: any = await fetch('/api/auth/authentic',
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ email: email, password: password })
    })

    const userResponse = await apiToken.json()

    setCookie(undefined, 'infshop.token', userResponse.token, {
      maxAge: 60 * 60 * 4, // 4 hours
    })

    setUser(userResponse)

    Router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated , signIn }}>
      { children }
    </AuthContext.Provider>
  )
}
