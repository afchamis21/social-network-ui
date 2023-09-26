import { api } from '@/api/axios'
import { AuthResponse } from '@/types/auth'

interface GoogleLoginProps {
  idToken?: string
}

export async function googleLogin(data: GoogleLoginProps) {
  return api.post<AuthResponse>('/auth/login/google', { ...data })
}
