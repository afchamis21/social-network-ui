import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { SignOutButton } from '@/components/general/SignOutButton'

export async function Header() {
  const session = await getServerSession()

  return (
    <header className="bg-rose-800 px-4 py-2">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-slate-100 transition-colors">
            Social Network
          </h1>
        </Link>
        {session && <SignOutButton />}
      </div>
    </header>
  )
}
