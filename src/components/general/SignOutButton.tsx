'use client'

import { signOut } from 'next-auth/react'
import { logout } from '@/api/auth/logout'
import { useAuthorizationContext } from '@/context/AuthorizationContext'

export function SignOutButton() {
  const { getValidAccessToken } = useAuthorizationContext()

  async function handleSignOut() {
    const accessToken = await getValidAccessToken()

    if (!accessToken) {
      return await signOut({
        redirect: true,
        callbackUrl: '/login',
      })
    }

    return await Promise.all([
      logout({ authHeader: `Bearer ${accessToken}` }),
      signOut(),
    ])
  }

  return (
    <button className="text-slate-100 hover:underline" onClick={handleSignOut}>
      Logout
    </button>
  )
}
