'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function NewUser() {

    const {data: session, status } = useSession()

    const [ password, setPassword] = useState('')
    const [ confirmPwd, setConfirmPwd ] = useState('')

    
    
    
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
            password: password.value
        }


        try {
            const response = await fetch('/api/users', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                throw new Error('error with post')
            }
        } catch (error) {
            console.log('problem with post')
        }

        router.push('/api/auth/signin')

    }

  return (
    <div className='flex justify-center mt-20  '>

    

    <form onSubmit={handleSubmit} className='bg-slate-200 w-2/3 h-3/4  rounded-md outline pl-10 pr-10 pt-5 pb-10 mr-10 ml-10 lg:w-3/4 max-w-3xl '>

    <p className='text-end pb-1 text-lg  font-medium'>Create Account</p>

        <div className='mb-4 text-center  '>
            <label className='text-2xl  ' htmlFor='username'>
                Username
            </label>
            
            <div className='mt-2'>

            <input 
            className='    w-4/5 rounded-md  pl-2 '
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

            <p className='text-sm font-light mb-2'>passwords should be at least 8 char</p>

            <input
            type='password'
            id='password'
            name='password'
            className=' w-4/5 rounded-md  pl-2'
            />
        </div>

            
            

            

        </div>


        <div className='mb-4 text-center'>
            <label className='text-2xl ' htmlFor='password'>
                Confirm Password
            </label>
            <div className='mt-2'>

            

            <input
            type='password'
            
           
            className=' w-4/5 rounded-md  pl-2'
            />
        </div>

            
            

            

        </div>
        
        <div className='flex justify-center'>

        <button className='outline p-2 mt-5 rounded-md hover:bg-gray-300 '  type='submit' disabled={password == confirmPwd}>SignUp</button>

        </div>

    <div className='flow-root'>

        <Link href={'/api/auth/signin'} className='float-right mt-4 text-blue-700 hover:text-purple-500'>Already Have An Account? ...Click Here</Link>

    </div>


    </form>



    </div>
  )
}
