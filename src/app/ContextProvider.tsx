'use client'

import { SessionProvider } from 'next-auth/react'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthorizationContextProvider } from '@/context/AuthorizationContext'

interface ContextProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient()

export function ContextProvider({ children }: ContextProviderProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthorizationContextProvider>{children}</AuthorizationContextProvider>
      </QueryClientProvider>{' '}
    </SessionProvider>
  )
}
