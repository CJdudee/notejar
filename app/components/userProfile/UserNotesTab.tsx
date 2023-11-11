'use client'
import getUserPosts from '@/lib/getUserPosts'
import React, { Suspense, useEffect, useState } from 'react'
import Notes from '../Notes'
import LoadingProfile from '../LoadingProfile'

export default function UserNotesTab({ user }) {
    const [notes, setNotes] = useState(null)
    const [isLoading, setIsLoading ] = useState(true)
    const { id } = user
    
    useEffect(() => {
      if(!id) return null

      async function fetchUserPosts() {
        const notes = await getUserPosts(id)
        setNotes(notes)
        setIsLoading(false)

      }

      fetchUserPosts()
    }, [id])
    // const notes = await getUserPosts(id)

    if(isLoading) {
      return <LoadingProfile />
    }

  return (
      <div className=' '>

          <ul className='lg:grid grid-cols-2 gap-5 p-4 '>
            {notes.map((n: any) => {
              return (
                <Notes key={n._id} sessionUser={user} {...n}/>
                )
              })}
          </ul>

      </div>
  )
}
