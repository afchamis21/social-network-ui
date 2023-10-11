'use client'

import { EnvelopeSimple } from '@phosphor-icons/react'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { signOut, useSession } from 'next-auth/react'
import { findFriendRequests } from '@/api/friends/findFriendRequests'
import { useAuthorizationContext } from '@/context/AuthorizationContext'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FriendRequestList } from '@/components/general/FriendRequestList'
import { useState } from 'react'
import { acceptFriendRequest } from '@/api/friends/acceptFriendRequest'
import { declineFriendRequest } from '@/api/friends/declineFriendRequest'

export function NotificationContainer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { data: session } = useSession()
  const { getValidAccessToken } = useAuthorizationContext()
  const queryClient = useQueryClient()

  const {
    data: friendRequestsPages,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['friend-requests'],
    queryFn: fetchFriendRequests,
    enabled: !!session,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data.number
      const totalPages = lastPage?.data.totalPages

      if (!currentPage && currentPage !== 0) {
        return false
      }

      if (!totalPages && totalPages !== 0) {
        return false
      }

      if (currentPage + 1 === totalPages) {
        return false
      }

      return currentPage + 1
    },
  })

  const acceptFriendRequestMutation = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['friend-requests'],
      })
    },
  })

  const declineFriendRequestMutation = useMutation({
    mutationFn: declineFriendRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['friend-requests'],
      })
    },
  })

  async function fetchFriendRequests({ pageParam = 0 }) {
    const accessToken = await getValidAccessToken()
    if (!accessToken) {
      await signOut()
      return
    }

    return findFriendRequests({
      authHeader: `Bearer ${accessToken}`,
      page: pageParam,
      size: 1,
    })
  }

  async function handleAcceptFriendRequest(requestId: number) {
    const accessToken = await getValidAccessToken()
    if (!accessToken) {
      await signOut()
      return
    }

    await acceptFriendRequestMutation.mutateAsync({
      requestId,
      authHeader: `Bearer ${accessToken}`,
    })
  }

  async function handleDeclineFriendRequest(requestId: number) {
    const accessToken = await getValidAccessToken()
    if (!accessToken) {
      await signOut()
      return
    }

    await declineFriendRequestMutation.mutateAsync({
      requestId,
      authHeader: `Bearer ${accessToken}`,
    })
  }

  async function handleFetchNextPage() {
    await fetchNextPage()
  }

  const totalRequests =
    friendRequestsPages && friendRequestsPages.pages.length !== 0
      ? friendRequestsPages.pages.at(0)?.data.totalElements
      : 0

  return (
    <DropdownMenu.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <div className={'relative'}>
        <DropdownMenu.Trigger
          asChild
          disabled={totalRequests === 0 || isLoading}
        >
          <button
            className={
              'relative w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center ' +
              'group disabled:opacity-70'
            }
            disabled={totalRequests === 0}
          >
            <EnvelopeSimple
              size={24}
              className={
                'group-hover:text-rose-800 transition-colors group-disabled:text-gray-900'
              }
            />
            {totalRequests !== 0 && (
              <span
                className={
                  'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-gray-900 text-gray-100 ' +
                  'flex items-center justify-center rounded-full w-5 h-5 text-sm'
                }
              >
                {totalRequests}
              </span>
            )}
          </button>
        </DropdownMenu.Trigger>
        {friendRequestsPages && totalRequests !== 0 && (
          <DropdownMenu.Portal>
            <FriendRequestList
              friendRequestPages={friendRequestsPages}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              handleFetchNextPage={handleFetchNextPage}
              handleAcceptRequest={handleAcceptFriendRequest}
              handleDeclineRequest={handleDeclineFriendRequest}
            />
          </DropdownMenu.Portal>
        )}
      </div>
    </DropdownMenu.Root>
  )
}
