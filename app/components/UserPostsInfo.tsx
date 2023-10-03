'use client'


import React, { useEffect, useState } from 'react'
import Notes from './Notes'
import getUserPosts from '@/lib/getUserPosts'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default async function UserPostsInfo({user}: {
    user: any
}) {


    //const [userPosts, setUserPosts ] = useState(null)
    
    
    const { id } = user
    // const {data: session, status } = useSession({
        //     required: true,
        //     onUnauthenticated() {
            //         redirect('/')
            //     }
    // })
    
    const notes = await getUserPosts(id)
    
    console.log(notes)
    
    
    //setUserPosts(notes)
    
  return (
    <div className='outline p-4 bg-slate-300 '>
        <p className='text-2xl underline'>Notes</p>
        <ul className='   lg:grid grid-cols-2 gap-5 p-4 '>
          {notes.map((n: any) => {
            return (
              <Notes {...n}/>
            )
          })}
        </ul>

      </div>
  )
}
