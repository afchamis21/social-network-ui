type Metadata = {
  messages: string[]
}

export type Response<T> = {
  metadata: Metadata
  data: T
}
