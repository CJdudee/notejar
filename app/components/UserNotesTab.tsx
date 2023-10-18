import getUserPosts from '@/lib/getUserPosts'
import React, { Suspense } from 'react'
import Notes from './Notes'

export default async function UserNotesTab({ user }) {
    const { id } = user
    // const {data: session, status } = useSession({
        //     required: true,
        //     onUnauthenticated() {
            //         redirect('/')
            //     }
    // })
    
    const notes = await getUserPosts(id)


  return (
    <Suspense fallback={<p className=' text-center bg-slate-300  text-xl'>loading </p>}>

        <div className=' '>

       

        <ul className='   lg:grid grid-cols-2 gap-5 p-4 '>
          {notes.map((n: any) => {
            return (
              <Notes key={n._id} sessionUser={user} {...n}/>
              )
            })}
        </ul>

      </div>
    </Suspense>
  )
        }
