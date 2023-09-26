import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { login } from '@/api/auth/login'
import NextAuth from 'next-auth'
import { NextAuthUser } from '@/types/next-auth'
import { googleLogin } from '@/api/auth/googleLogin'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'username',
          type: 'text',
        },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await login({
            data: {
              username: credentials?.username,
              password: credentials?.password,
            },
          })

          const { user, ...tokens } = response.data.data

          return {
            ...tokens,
            ...user,
            id: user.userId,
          }
        } catch (e) {
          return null
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.authData) {
        token = {
          ...token,
          ...account.authData,
        }
      }

      return { ...token, ...user }
    },

    async session({ session, token }) {
      session.user = token as NextAuthUser
      return session
    },

    async signIn({ account }) {
      if (account?.provider === 'google') {
        const response = await googleLogin({
          idToken: account.id_token,
        })

        const { user, ...tokens } = response.data.data
        account.authData = {
          ...user,
          ...tokens,
          id: user.userId,
        }
      }
      return true
    },
  },

  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
