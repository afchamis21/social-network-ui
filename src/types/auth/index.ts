import { Response } from '@/types/response'
import { User } from '@/types/user'

export type LoginData = {
  username?: string
  password?: string
}

export type AuthData = {
  accessToken: string
  refreshToken: string
  user: User
}

export type AuthResponse = Response<AuthData>
