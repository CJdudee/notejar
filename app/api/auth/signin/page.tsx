'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function page() {

    const {data: session, status } = useSession()

    
    
    
    const router = useRouter()
    
    if (status === 'authenticated') {
        router.push('/')
    }
    

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        const target = e.currentTarget

        const username = target.elements.namedItem('username') as HTMLInputElement
        const password = target.elements.namedItem('password') as HTMLInputElement

        const data = {
            username: username.value,
            password: password.value,
            redirect: true, 
            callbackUrl: '/'
        }

        const result = await signIn('credentials', data)
        

       

    }

  return (
    <div className='flex justify-center mt-20  '>

    

    <form onSubmit={handleSubmit} className='bg-slate-200 w-2/3 h-3/4  rounded-md outline pl-10 pr-10 pt-5 pb-10 mr-10 ml-10 max-w-4xl '>

    <p className='text-end pb-1 text-lg  font-medium'>LogIn</p>

        <div className='mb-4 text-center  '>
            <label className='text-2xl  ' htmlFor='username'>
                Username
            </label>
            
            <div className='mt-2'>

            <input 
            className='    w-4/6 rounded-md  pl-2 '
            id='username'
            type='text'
            name='username'
            required
            minLength={3}
            />
            </div>

        </div>

        <div className='mb-4 text-center'>
            <label className='text-2xl ' htmlFor='password'>
                Password
            </label>
            <div className='mt-2'>

            <input
            type='password'
            id='password'
            name='password'
            className='w-4/6 rounded-md  pl-2'
            />
            </div>

        </div>
        
        <div className='flex justify-center'>

        <button className='outline p-2 mt-5 rounded-md hover:bg-gray-300 '  type='submit'>LogIn</button>
        </div>

        <div className='flow-root mt-4'>


        <Link href={'/newuser'} className='float-right text-blue-700 hover:text-purple-500'>New? ...Make a account here</Link>

        </div>
    </form>
    </div>
  )
}
