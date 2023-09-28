import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { PostsSection } from '@/components/home/PostsSection'
import { UserCard } from '@/components/home/UserCard'
import { PossibleFriendsSection } from '@/components/home/PossibleFriendsSection'

export default async function Home() {
  const data = await getServerSession(authOptions)

  if (!data) {
    redirect('/login')
  }

  return (
    <main
      className={'flex flex-col md:flex-row md:justify-around gap-8 flex-1 '}
    >
      <div>
        <UserCard user={data.user} />
        <PossibleFriendsSection />
      </div>
      <PostsSection />
    </main>
  )
}
