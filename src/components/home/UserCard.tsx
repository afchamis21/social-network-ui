'use client'

import { NextAuthUser } from '@/types/next-auth'

interface UserCardProps {
  user: NextAuthUser
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div
      className={'bg-white shadow rounded-md py-2 px-6 flex flex-col divide-y'}
    >
      <div className={'py-2 text-lg font-bold'}>
        <p>{user.username}</p>
      </div>
      <div className={'py-2'}>
        <small className={'text-rose-800'}>Email:</small>
        <p>{user.email}</p>
      </div>
    </div>
  )
}
