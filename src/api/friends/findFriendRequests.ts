import { AuthenticatedRequest } from '@/types/auth'
import { api } from '@/api/axios'
import { FriendRequestsResponse } from '@/types/friend-requests'

interface FindFriendRequests extends AuthenticatedRequest {
  size: number
  page: number
}

export async function findFriendRequests({
  size,
  page,
  authHeader,
}: FindFriendRequests) {
  const response = await api.get<FriendRequestsResponse>(
    '/friend/request/all',
    {
      params: {
        size,
        page,
      },
      headers: {
        Authorization: authHeader,
      },
    },
  )

  return response.data
}
