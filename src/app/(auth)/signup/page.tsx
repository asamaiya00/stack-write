'use client'
import { useAuthStore } from '@/store/auth'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react'
import { BottomGradient, LabelInputContainer } from '../layout'
const Signup = () => {
  const { createAccount, login } = useAuthStore()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')

    if (!email || !password || !name) {
      setError('Please fill all fields')
      return
    }
    setLoading(true)
    setError('')
    const signupResponse = await createAccount(
      email?.toString(),
      password?.toString(),
      name?.toString()
    )
    if (signupResponse?.error) {
      setError(signupResponse.error.message)
    } else {
      const loginResponse = await login(email?.toString(), password?.toString())
      if (loginResponse?.error) {
        setError(loginResponse.error.message)
      }
    }
    setLoading(false)
  }

  return (
    <div className='flex h-screen w-full items-center justify-center flex-col gap-4'>
      <div className='shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black'>
        <h2 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>
          Signup for Stack Write
        </h2>

        <form className='my-8' onSubmit={handleSubmit}>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' name='name' placeholder='Enter name' type='text' />
          </LabelInputContainer>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              id='email'
              name='email'
              placeholder='Enter email'
              type='email'
            />
          </LabelInputContainer>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              placeholder='Enter password'
              type='password'
            />
          </LabelInputContainer>

          <button
            className='group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]'
            type='submit'
            disabled={loading}
          >
            Signup &rarr;
            <BottomGradient />
          </button>

          <div className='my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700' />

          <div className='flex flex-col space-y-4'>
            <button
              className='group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]'
              type='submit'
              disabled={loading}
            >
              <IconBrandGithub className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
              <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                GitHub
              </span>
              <BottomGradient />
            </button>
            <button
              className='group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]'
              type='submit'
              disabled={loading}
            >
              <IconBrandGoogle className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
              <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                Google
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default Signup
