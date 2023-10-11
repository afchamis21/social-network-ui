import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { SignOutButton } from '@/components/general/SignOutButton'
import { NotificationContainer } from '@/components/general/NotificationContainer'

export async function Header() {
  const session = await getServerSession()

  return (
    <header className="bg-rose-800 px-4 pb-4 pt-6">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-slate-100 transition-colors">
            Social Network
          </h1>
        </Link>
        {session && (
          <div className={'flex gap-4'}>
            <SignOutButton />
            <NotificationContainer />
          </div>
        )}
      </div>
    </header>
  )
}
