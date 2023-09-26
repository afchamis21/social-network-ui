'use client'

import { SessionProvider } from 'next-auth/react'

import { ReactNode } from 'react'

interface ContextProviderProps {
  children: ReactNode
}

export function ContextProvider({ children }: ContextProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
