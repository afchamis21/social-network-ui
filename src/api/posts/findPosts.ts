import { api } from '@/api/axios'
import { PostsResponse } from '@/types/posts'
import { AuthenticatedRequest } from '@/types/auth'

interface FindPostsProps extends AuthenticatedRequest {
  page?: number
  size?: number
}

export async function findPosts({
  authHeader,
  page = 0,
  size = 10,
}: FindPostsProps) {
  const response = await api.get<PostsResponse>('post/', {
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
