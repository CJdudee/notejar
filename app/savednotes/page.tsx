import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import Notes from '../components/Notes'
import SavedNotes from '../components/SavedNotes'

export default async function page() {

    const session = await getServerSession(options)

//      console.log(session)
  

        if(!session || !session.user.id) return <p>no session found</p>



        const notes = await fetch(`http://localhost:3000/api/users/saved/${session.user.id}`, { cache: 'no-cache'})

        const savedNotesJson = await notes.json() 

        //console.log(savedNotesJson)

        



        return (
            <div>
                <p className='text-white text-center font-bold text-xl bg-slate-500'>SaveNotes</p>

                <div className='p-4 bg-gray-400 rounded-md lg:grid-flow-row lg:grid lg:grid-cols-2 gap-2'>


            {savedNotesJson.map((r: any) => {
                return (
                    <SavedNotes {...r.noteId} />
                    )
                })}

                </div>


                </div>
  )
}
