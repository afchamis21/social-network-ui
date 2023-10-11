'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useAuthorizationContext } from '@/context/AuthorizationContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { findPotentialFriends } from '@/api/friends/findPotentialFriends'
import { UserPlus } from '@phosphor-icons/react'
import { addFriend } from '@/api/friends/addFriend'
import { PageController } from '@/components/general/PageController'

export function PossibleFriendsSection() {
  const [page, setPage] = useState(0)
  const { data: session } = useSession()
  const { getValidAccessToken } = useAuthorizationContext()

  const queryClient = useQueryClient()
  const { data: potentialFriends, isLoading } = useQuery({
    queryKey: ['potential-friends', page],
    queryFn: () => fetchPotentialFriends(page),
    enabled: !!session,
  })

  const addFriendMutation = useMutation({
    mutationFn: handleAddFriend,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['potential-friends'] })
    },
  })

  async function fetchPotentialFriends(page: number) {
    const accessToken = await getValidAccessToken()
    if (!accessToken) {
      await signOut()
      return
    }

    return findPotentialFriends({
      authHeader: `Bearer ${accessToken}`,
      page,
      size: 5,
    })
  }

  async function handleAddFriend(friendId: string) {
    const accessToken = await getValidAccessToken()
    if (!accessToken) {
      await signOut()
      return
    }

    return await addFriend({
      authHeader: `Bearer ${accessToken}`,
      userId: friendId,
    })
  }

  function handlePreviousPage() {
    setPage((value) => {
      return value === 0 ? value : value - 1
    })
  }

  function handleNextPage() {
    setPage((value) => {
      return value + 1 === potentialFriends?.data.totalPages ? value : value + 1
    })
  }

  function handleSpecificPage(target: number) {
    setPage((value) => {
      if (!potentialFriends) {
        return value
      }

      if (target < 0 || target > potentialFriends.data.totalPages) {
        return value
      }

      return target
    })
  }

  return (
    <div className={'flex flex-col gap-4'}>
      <h2 className={'border-b border-rose-800'}>Encontre novos amigos</h2>
      {isLoading ? (
        <p>Carregando usuários</p>
      ) : (
        <div className={'flex flex-col gap-2'}>
          {potentialFriends && potentialFriends.data.content.length !== 0 ? (
            <>
              {potentialFriends.data.content.map((user) => (
                <div
                  className={
                    'relative bg-white shadow rounded-md flex flex-col p-4 gap-2'
                  }
                  key={user.userId}
                >
                  <button
                    className={
                      'absolute right-2 top-2  p-2 rounded-md ' +
                      'hover:text-rose-800 hover:bg-gray-200 transition-colors'
                    }
                    onClick={() => addFriendMutation.mutate(user.userId)}
                  >
                    <UserPlus size={18} />
                  </button>
                  <div>
                    <small className={'text-rose-800'}>Nome de usuário:</small>
                    <p>{user.username}</p>
                  </div>
                  <div>
                    <small className={'text-rose-800'}>Email:</small>
                    <p>{user.email}</p>
                  </div>
                </div>
              ))}
              <PageController
                currentPage={page}
                lastPage={potentialFriends.data.totalPages}
                maxPages={5}
                isLoading={isLoading}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handleSpecificPage={handleSpecificPage}
              />
            </>
          ) : (
            <p>Não há usuários para mostrar</p>
          )}
        </div>
      )}
    </div>
  )
}
