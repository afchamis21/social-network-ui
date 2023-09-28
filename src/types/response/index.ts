type Metadata = {
  messages: string[]
}

export type Response<T> = {
  metadata: Metadata
  data: T
}

export type PaginatedResponse<T> = Response<{
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
  content: T[]
}>
