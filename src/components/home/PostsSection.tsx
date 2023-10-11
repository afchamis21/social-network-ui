'use client'

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { findPosts } from '@/api/posts/findPosts'
import { useState } from 'react'
import { createPost } from '@/api/posts/createPost'
import { signOut, useSession } from 'next-auth/react'
import { SpinnerGap } from '@phosphor-icons/react'
import { useAuthorizationContext } from '@/context/AuthorizationContext'
import { Post } from '@/components/home/Post'

export function PostsSection() {
  const [content, setContent] = useState('')
  const { data: session } = useSession()
  const { getValidAccessToken } = useAuthorizationContext()

  const queryClient = useQueryClient()
  const {
    data: posts,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    enabled: !!session,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data.number
      const totalPages = lastPage?.data.totalPages

      if (currentPage === totalPages) {
        return false
      }

      if (!currentPage && currentPage !== 0) {
        return false
      }

      if (!totalPages && totalPages !== 0) {
        return false
      }

      return currentPage + 1
    },
  })

  const createPostMutation = useMutation({
    mutationFn: handleCreatePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  async function fetchPosts({ pageParam = 0 }) {
    const accessToken = await getValidAccessToken()
    if (!accessToken) {
      await signOut()
      return
    }
    return findPosts({
      authHeader: `Bearer ${accessToken}`,
      page: pageParam,
      size: 5,
    })
  }

  async function handleCreatePost() {
    const accessToken = await getValidAccessToken()
    if (!accessToken) {
      await signOut()
      return
    }

    const response = await createPost({
      content,
      authHeader: `Bearer ${accessToken}`,
    })
    setContent('')
    return response
  }

  return (
    <div className={'flex flex-col gap-8 w-full md:w-2/3'}>
      <div className={'flex flex-col gap-2 '}>
        <textarea
          placeholder={'Crie um post...'}
          className={
            'resize-vertical p-4 rounded-md min-h-[8rem] border-2 border-gray-400 hover:border-rose-800 focus:outline-rose-800'
          }
          onChange={(event) => setContent(event.target.value)}
          value={content}
        />
        <button
          className={
            'w-fit py-1 px-2 rounded-md border-2 border-gray-400 hover:border-rose-800 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400'
          }
          onClick={() => createPostMutation.mutate()}
          disabled={createPostMutation.isLoading || !content}
        >
          {createPostMutation.isLoading ? (
            <div className={'animate-spin'}>
              <SpinnerGap size={24} />
            </div>
          ) : (
            <span>Continuar</span>
          )}
        </button>
      </div>

      <div className={'flex flex-col gap-4'}>
        {isLoading ? (
          <p>Carregando...</p>
        ) : posts?.pages.length ? (
          <>
            {posts?.pages.map(
              (page) =>
                page?.data.content.map((post) => (
                  <Post key={post.postId} post={post} />
                )),
            )}
            {hasNextPage && (
              <button
                className={
                  'hover:text-rose-800 disabled:text-gray-900 hover:underline transition-colors flex items-center justify-center w-fit ' +
                  'disabled:cursor-not-allowed disabled:text-gray-900 disabled:opacity-70'
                }
                type={'button'}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                Carregar mais posts
              </button>
            )}
          </>
        ) : (
          <p>Não existem posts para exibir!</p>
        )}
      </div>
    </div>
  )
}
