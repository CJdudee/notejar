'use client'


import { useRouter } from 'next/navigation'
import React from 'react'

export default function NewUser() {

    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const target = e.currentTarget

        const title = target.elements.namedItem('title') as HTMLInputElement
        const content = target.elements.namedItem('content') as HTMLInputElement

        const data = {
            title: title.value,
            content: content.value
        }


        try {
            const response = await fetch('/api/blog', {
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

        router.push('/')

    }

  return (
    <div className='p-10'>

    <form onSubmit={handleSubmit} className='bg-slate-200 text-center p-10 rounded-md outline'>
        <div className='mb-4 text-start '>
            <label className='text-2xl ' htmlFor='title'>
                title
            </label>
            
            <div>

            <input 
            className=' rounded-md border w-1/2 lg:w-1/4 pl-2  '
            id='title'
            type='text'
            name='title'
            required
            minLength={3}
            />
            </div>

        </div>

        <div className='mb-4 text-start'>
            <label className='text-2xl' htmlFor='content'>
                content
            </label>
            <div>

            <textarea 
            rows={8}
            id='content'
            name='content'
            className='w-full text-xl rounded-md p-2'
            />
            </div>

        </div>
        <button className='outline p-2 mt-5 rounded-md'  type='submit'>send</button>
    </form>
            </div>
  )
}
