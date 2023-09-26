import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Home() {
  const data = await getServerSession(authOptions)

  if (!data) {
    redirect('/login')
  }
  return <h1>Hello World</h1>
}
