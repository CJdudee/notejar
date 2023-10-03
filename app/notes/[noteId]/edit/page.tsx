'use client'

import EditNotes from '@/app/components/EditNotes'
import React, { Suspense } from 'react'


type Params = {
    params: {
        noteId: string
    }
}


export default async function page({params: { noteId } }: Params) {

  const notes = await fetch(`http://localhost:3000/api/singlenote/${noteId}`, { cache: 'no-cache'})

    const noteJson = await notes.json()

    console.log(noteJson)


  return (
    <div className='p-8'>
        <Suspense fallback={<p>loading...</p>} >
            <EditNotes {...noteJson} noteId={noteId} />
        </Suspense>
    </div>
  )
}
