import { AuthenticatedRequest } from '@/types/auth'
import { api } from '@/api/axios'

interface AcceptFriendRequestProps extends AuthenticatedRequest {
  requestId: number
}

export async function declineFriendRequest({
  requestId,
  authHeader,
}: AcceptFriendRequestProps) {
  return await api.post(
    '/friend/request/cancel',
    { requestId },
    {
      headers: {
        Authorization: authHeader,
      },
    },
  )
}
