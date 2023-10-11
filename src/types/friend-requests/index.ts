import { User } from '@/types/user'
import { PaginatedResponse } from '@/types/response'

export type FriendRequest = {
  requestId: number
  sender: User
  receiver: User
}

export type FriendRequestsResponse = PaginatedResponse<FriendRequest>
