import NextAuth from 'next-auth/src'

export type NextAuthUser = {
  accessToken: string
  refreshToken: string
  username: string
  id: string
  email: string
}

declare module 'next-auth' {
  interface Session {
    user: NextAuthUser
  }

  interface Account extends Account {
    authData?: NextAuthUser
  }
}
