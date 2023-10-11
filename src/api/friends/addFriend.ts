import { AuthenticatedRequest } from '@/types/auth'
import { api } from '@/api/axios'

interface AddFriendProps extends AuthenticatedRequest {
  userId: string
}

export async function addFriend({ userId, authHeader }: AddFriendProps) {
  return await api.post(
    '/friend/request/send',
    { userId },
    {
      headers: {
        Authorization: authHeader,
      },
    },
  )
}
