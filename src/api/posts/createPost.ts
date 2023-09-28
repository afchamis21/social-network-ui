import { api } from '@/api/axios'
import { AuthenticatedRequest } from '@/types/auth'
import { CreatePostResponse } from '@/types/posts'

interface CreatePostProps extends AuthenticatedRequest {
  content: string
}

export async function createPost({ content, authHeader }: CreatePostProps) {
  return await api.post<CreatePostResponse>(
    'post/',
    { content },
    {
      headers: {
        Authorization: authHeader,
      },
    },
  )
}
