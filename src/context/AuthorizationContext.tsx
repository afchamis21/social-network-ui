import { createContext, ReactNode, useContext } from 'react'
import { useSession } from 'next-auth/react'
import { decode, JwtPayload } from 'jsonwebtoken'
import { refreshAccessToken } from '@/api/auth/refreshAccessToken'

interface AuthorizationContext {
  getValidAccessToken: () => Promise<string | null>
}

const authorizationContext = createContext<AuthorizationContext | null>(null)

interface AuthorizationContextProviderProps {
  children: ReactNode
}

export function AuthorizationContextProvider({
  children,
}: AuthorizationContextProviderProps) {
  const { data: session } = useSession()

  function isTokenExpired(accessToken: string) {
    const decodedToken = decode(accessToken) as JwtPayload | undefined
    const expTime = decodedToken?.exp

    if (!expTime) {
      throw new Error('Error decoding token')
    }

    const expTimeInMillis = expTime * 1000

    const nowInMillis = Date.now()

    return expTimeInMillis < nowInMillis
  }

  async function getValidAccessToken() {
    if (!session) {
      console.error(
        'The AuthorizationContext must be used within an authenticated page',
      )
      return null
    }

    const { accessToken, refreshToken } = session.user

    try {
      if (!isTokenExpired(accessToken)) {
        return accessToken
      }

      console.log('Refreshing access token')

      const tokenResponse = await refreshAccessToken({ refreshToken })
      session.user.accessToken = tokenResponse.data.data.accessToken
      session.user.refreshToken = tokenResponse.data.data.refreshToken

      console.log('New access token', session.user.accessToken)

      return session.user.accessToken
    } catch (e) {
      return null
    }
  }

  return (
    <authorizationContext.Provider value={{ getValidAccessToken }}>
      {children}
    </authorizationContext.Provider>
  )
}

export function useAuthorizationContext() {
  const context = useContext(authorizationContext)
  if (!context) {
    throw new Error(
      'useAuthorizationContext must be used within a AuthorizationContextProvider',
    )
  }

  return context
}
