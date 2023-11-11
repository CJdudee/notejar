import React, { useEffect, useState } from 'react'
import ProfileNotes from './ProfileNotes'
import getUserPosts from '@/lib/getUserPosts'
import LoadingProfile from '../LoadingProfile'

export default function ViewUserNotes({ userId, user }) {
    const [ isLoading , setIsLoading ] = useState(true)
    const [ notes, setNotesJson ] = useState<any>()

    useEffect(() => {
      async function fetchNotes() {
    
        const notes = await getUserPosts(userId)
  
        setNotesJson(notes)
        setIsLoading(false)
  
      }
        fetchNotes()
      })

      if(isLoading === true || !notes) {
        return (
          <LoadingProfile />
            )
      }


  return (
    <div>
      <div className='flex justify-center gap-1'>

        <p className='text-black text-xl bg-slate-300 text-center font-semibold'>User: {user.username}</p>
        <div className='w-5 h-5 rounded-xl' style={{ background: user.profileColor }} />
        
      </div>
  
      <div className='bg-slate-300 '>
          <p className='text-2xl underline text-center'>Notes</p>
          <ul className='lg:grid grid-cols-2 gap-4 p-2 mt-1 '>
          {notes.map((n: any) => {
              return (
              <ProfileNotes key={n._id} {...n}/>
              )
          })}
          </ul>
      </div>

    </div>
  )
}
