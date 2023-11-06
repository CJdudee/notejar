import getUserPosts from '@/lib/getUserPosts'
import React, { Suspense } from 'react'
import Notes from './Notes'

export default async function UserNotesTab({ user }) {
    const { id } = user
    
    const notes = await getUserPosts(id)


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
