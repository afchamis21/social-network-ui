import { LoginForm } from '@/app/login/LoginForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const data = await getServerSession()
  if (data) {
    redirect('/')
  }
  return (
    <div className="flex-1 mx-auto flex items-center justify-center">
      <LoginForm />
    </div>
  )
}
