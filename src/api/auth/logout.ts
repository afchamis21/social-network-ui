import { api } from '@/api/axios'
import { AuthenticatedRequest } from '@/types/auth'

type LogoutProps = AuthenticatedRequest

export async function logout({ authHeader }: LogoutProps) {
  return await api.post(
    '/auth/logout',
    {},
    {
      headers: {
        Authorization: authHeader,
      },
    },
  )
}
