import { InfiniteData } from '@tanstack/query-core'
import { FriendRequestsResponse } from '@/types/friend-requests'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Check, X } from '@phosphor-icons/react'

interface FriendRequestListProps {
  friendRequestPages: InfiniteData<FriendRequestsResponse | undefined>
  isFetchingNextPage: boolean
  hasNextPage?: boolean
  handleFetchNextPage: () => void
  handleAcceptRequest: (requestId: number) => void
  handleDeclineRequest: (requestId: number) => void
}

export function FriendRequestList({
  friendRequestPages,
  isFetchingNextPage,
  hasNextPage,
  handleFetchNextPage,
  handleAcceptRequest,
  handleDeclineRequest,
}: FriendRequestListProps) {
  return (
    <DropdownMenu.Content
      className={
        'absolute bg-gray-100 shadow shadow-gray-900 right-0 top-2 p-4 w-fit '
      }
    >
      <div className={'divide-y divide-gray-400 '}>
        {friendRequestPages?.pages.map(
          (page) =>
            page?.data.content.map((friendRequest) => (
              <DropdownMenu.Item
                onSelect={(event) => {
                  event.preventDefault()
                }}
                key={friendRequest.requestId}
                className={
                  'p-2 cursor-default transition-colors hover:outline-0 hover:bg-gray-200 flex gap-4 justify-between'
                }
              >
                <p>{friendRequest.sender.username}</p>
                <div className={'flex gap-2'}>
                  <button
                    className={
                      'transition-colors hover:text-green-600 hover:bg-gray-300 p-1 rounded'
                    }
                    onClick={() => handleAcceptRequest(friendRequest.requestId)}
                  >
                    <Check />
                  </button>
                  <button
                    className={
                      'transition-colors hover:text-red-600 hover:bg-gray-300 p-1 rounded'
                    }
                    onClick={() =>
                      handleDeclineRequest(friendRequest.requestId)
                    }
                  >
                    <X />
                  </button>
                </div>
              </DropdownMenu.Item>
            )),
        )}
      </div>
      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          type={'button'}
          onClick={handleFetchNextPage}
          className={
            'mt-4 transition-colors hover:text-rose-800 hover:underline'
          }
        >
          <p className={'min-w-max'}>Carregar mais solicitações</p>
        </button>
      )}
    </DropdownMenu.Content>
  )
}
