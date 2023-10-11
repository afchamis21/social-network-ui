import { PaginatedResponse } from '@/types/response'

export type User = {
  userId: string
  username: string
  email: string
}

export type UsersResponse = PaginatedResponse<User>
