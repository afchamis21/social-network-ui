import { AuthResponse } from '@/types/auth'
import { api } from '@/api/axios'

interface RefreshAccessTokenProps {
  refreshToken: string
}

export async function refreshAccessToken({
  refreshToken,
}: RefreshAccessTokenProps) {
  return api.post<AuthResponse>('/auth/refresh', { refreshToken })
}
