import { Post } from '@/types/posts'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface PostProps {
  post: Post
}

export function Post({ post }: PostProps) {
  function formatDateFromString(date: string) {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: ptBR,
    })
  }
  return (
    <div className={'bg-gray-50 shadow rounded-md p-2 flex flex-col gap-2'}>
      <header className={'border-b border-rose-800'}>
        Autor: {post.owner.username}
      </header>
      <div className={'max-h-72 overflow-auto'}>
        <p>{post.content}</p>
      </div>
      <footer className={'mt-2'}>
        <p className={'text-sm'}>
          Editado pela última vez {formatDateFromString(post.updateDt)}
        </p>
      </footer>
    </div>
  )
}
