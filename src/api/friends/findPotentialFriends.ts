import { AuthenticatedRequest } from '@/types/auth'
import { api } from '@/api/axios'
import { UsersResponse } from '@/types/user'

interface FindPotentialFriendsProps extends AuthenticatedRequest {
  page?: number
  size?: number
}

export async function findPotentialFriends({
  size = 5,
  page = 0,
  authHeader,
}: FindPotentialFriendsProps) {
  const response = await api.get<UsersResponse>('friend/find', {
    headers: {
      Authorization: authHeader,
    },
    params: {
      sort: 'createDt,desc',
      page,
      size,
    },
  })

  return response.data
}
