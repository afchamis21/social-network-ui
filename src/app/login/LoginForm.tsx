'use client'

import { GoogleLogo, SpinnerGap } from '@phosphor-icons/react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

const loginFormSchema = zod.object({
  username: zod.string().min(1, 'Preencha o nome de usuário'),
  password: zod.string().min(1, 'Preencha a senha'),
})

type LoginFormData = zod.infer<typeof loginFormSchema>

export function LoginForm() {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const params = useSearchParams()
  const isError = !!params.get('error')

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleGoogleSignIn() {
    setIsSigningIn(true)
    await signIn('google', {
      redirect: true,
      callbackUrl: '/',
    })
  }

  async function handleCredentialsSignIn(formData: LoginFormData) {
    setIsSigningIn(true)
    await signIn('credentials', {
      username: formData.username,
      password: formData.password,
      redirect: true,
      callbackUrl: '/',
    })
  }

  return (
    <div className="shadow shadow-gray-950 border-rose-800 rounded-md p-4 flex flex-col gap-6">
      <h2 className="text-center text-xl font-bold">Login</h2>
      <form
        className={'flex flex-col gap-4'}
        onSubmit={handleSubmit(handleCredentialsSignIn)}
      >
        <label htmlFor={'username'} className={'flex flex-col gap-1'}>
          <span className={'text-sm'}>Nome de usuário</span>
          <input
            id={'username'}
            className={
              'rounded-md border-2 border-gray-900 hover:border-rose-800 px-2 py-1'
            }
            {...register('username')}
          />
          {formErrors.username && (
            <p className={'text-sm text-red-600'}>
              {formErrors.username.message}
            </p>
          )}
        </label>
        <label htmlFor={'password'} className={'flex flex-col gap-1'}>
          <span className={'text-sm'}>Senha</span>
          <input
            id={'password'}
            className={
              'rounded-md border-2 border-gray-900 hover:border-rose-800 px-2 py-1'
            }
            type={'password'}
            {...register('password')}
          />
          {formErrors.password && (
            <p className={'text-sm text-red-600'}>
              {formErrors.password.message}
            </p>
          )}
        </label>
        {isError && !isDirty && (
          <p className={'text-sm text-red-600'}>Credenciais inválidas!</p>
        )}
        <button
          className={
            'px-2 py-1 bg-gray-900 text-gray-100 hover:bg-rose-800 transition-colors flex items-center justify-center ' +
            'disabled:cursor-not-allowed disabled:text-gray-100 disabled:bg-gray-900 disabled:opacity-70'
          }
          disabled={isSigningIn}
        >
          {isSigningIn ? (
            <div className={'animate-spin'}>
              <SpinnerGap size={24} />
            </div>
          ) : (
            <span>Continuar</span>
          )}
        </button>
        <button
          className={
            'px-2 py-1 border border-gray-900 hover:text-rose-800 hover:border-rose-800 transition-colors flex gap-2 items-center justify-center ' +
            'disabled:cursor-not-allowed disabled:text-gray-900 disabled:border-gray-900 disabled:opacity-70'
          }
          type={'button'}
          onClick={handleGoogleSignIn}
          disabled={isSigningIn}
        >
          {isSigningIn ? (
            <div className={'animate-spin'}>
              <SpinnerGap size={24} />
            </div>
          ) : (
            <>
              <GoogleLogo size={24} />
              Fazer login com Google
            </>
          )}
        </button>
      </form>

      <p className={'text-center'}>
        Ainda não tem uma conta?{' '}
        <Link
          href={'/register'}
          className={'hover:text-rose-800 hover:underline'}
        >
          Crie uma agora
        </Link>
      </p>
    </div>
  )
}
