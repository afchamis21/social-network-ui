import { NextAuthUser } from '@/types/next-auth'

interface UserCardProps {
  user: NextAuthUser
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div>
      <p>{user.username}</p>
      <p>{user.email}</p>
    </div>
  )
}
