'use client'

import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button
      className="text-slate-100 hover:underline"
      onClick={() => signOut()}
    >
      Logout
    </button>
  )
}
