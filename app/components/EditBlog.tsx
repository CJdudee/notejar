'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function EditBlog({title, content, _id}: {
    title: string,
    content: string, 
    _id: string
}) {
    const router = useRouter()

    const [editTitle, setEditTitle ] = useState(title)
    const [editContent, setEditContent ] = useState(content)

    


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // const target = e.currentTarget

        // const title = target.elements.namedItem('title') as HTMLInputElement
        // const content = target.elements.namedItem('content') as HTMLInputElement

        const data = {
            title: editTitle,
            content: editContent,
            _id,
        }


        try {
            const response = await fetch('/api/blog', {
                method: "PATCH",
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


    async function handleDelete(e: any) {

        const data = {
            _id
        }

        try {
            const response = await fetch('/api/blog', {
                method: 'DELETE',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) throw new Error('erro with delete')
        } catch (error) {
            
            console.log('error')
        }
    }

  return (
    <div className='p-10'>

   
    <form onSubmit={handleSubmit} className='bg-slate-200 text-center p-10 rounded-md outline'>
        <div className='mb-4 text-start'>
            <label className='text-2xl' htmlFor='title'>
                title
            </label>

            <div >

            <input 
            className='rounded-md border w-1/2 lg:w-1/4 pl-2'
            id='title'
            type='text'
            name='title'
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
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
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            className='w-full text-xl rounded-md p-2 min-h-1/2'
            />
            </div>

        </div>
        
        <div className='flex justify-evenly'>

        <button className='outline p-2 mt-5 rounded-md ' type='submit'>Post</button>
        <button className='outline p-2 mt-5 rounded-md ' onClick={handleDelete}>Delete post</button>
        
        </div>

    </form>

    </div>
  )

}
