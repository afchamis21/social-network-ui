import { User } from '@/types/user'
import { PaginatedResponse, Response } from '@/types/response'

export type Post = {
  postId: string
  content: string
  updateDt: string
  owner: User
}

export type CreatePostResponse = Response<Post>

export type PostsResponse = PaginatedResponse<Post>
