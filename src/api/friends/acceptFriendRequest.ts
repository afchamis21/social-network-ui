import { AuthenticatedRequest } from '@/types/auth'
import { api } from '@/api/axios'

interface AcceptFriendRequestProps extends AuthenticatedRequest {
  requestId: number
}

export async function acceptFriendRequest({
  requestId,
  authHeader,
}: AcceptFriendRequestProps) {
  return await api.post(
    '/friend/request/accept',
    { requestId },
    {
      headers: {
        Authorization: authHeader,
      },
    },
  )
}
