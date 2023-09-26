import { AuthResponse, LoginData } from '@/types/auth'
import { api } from '@/api/axios'

interface LoginProps {
  data: LoginData
}

export async function login({ data }: LoginProps) {
  return api.post<AuthResponse>('/auth/login', { ...data })
}
