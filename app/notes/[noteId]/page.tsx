'use client'

import { options } from '@/app/api/auth/[...nextauth]/options'
import SingleNotes from '@/app/components/SingleNotes'
import isNoteSaved from '@/lib/isNoteSaved'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { Suspense, useEffect, useState } from 'react'



type Params = {
    params: {
        noteId: string
    }
}

export default  function page({params: { noteId } }: Params) {

  const {data: session, status } = useSession({
    required: true,
    // onUnauthenticated() {
    //     redirect('/')
    // }
})

  const [ isLoading, setIsLoading ] = useState(true)
  const [ noteJson, setNoteJson ] = useState<any>()
  const [ isSaved, setIsSaved ] = useState(false)


  useEffect(() => {


    async function fetchNote() {

      const notes = await fetch(`http://localhost:3000/api/singlenote/${noteId}`, { cache: 'no-cache'})
      
      const noteJson = await notes.json()

      setNoteJson(noteJson)

      

    }

    async function fetchSave() {

    const saved =  await fetch(`http://localhost:3000/api/singlenote/saves/${noteId}`, {cache: 'no-cache'})

    const isSaved = await saved.json()

    setIsSaved(isSaved)

    }

    async function fetchResult() {

      await fetchNote()
      await fetchSave()
      setIsLoading(false)

    }



    fetchResult()


    


  }, [])
    

    // const notes = await fetch(`http://localhost:3000/api/singlenote/${noteId}`, { cache: 'no-cache'})
    
    // const noteJson = await notes.json()

    


    //const saved =  await fetch(`http://localhost:3000/api/singlenote/saves/${noteId}`, {cache: 'no-cache'})

    //const isSaved = await saved.json()


    //console.log(session)
    
   //const session = await getServerSession(options)

   


   //const isLiked = true

   //const isSaved = true

   


  

  
    console.log(session)

 

    // const notes = await fetch(`http://localhost:3000/api/singlenote/${noteId}`, { cache: 'no-cache'})

    // const noteJson = await notes.json()

    if (isLoading === true || status === 'loading' || !noteJson ||!noteJson || !noteJson?.liked_by ) {
      return (
        <div className='p-4'>

      <p>...Loading</p>
      
        </div>
      )
    }

    if(noteJson?.liked_by) {
      
      var isLiked = noteJson.liked_by.includes(session.user.id)
    }

    console.log(noteJson)

   
  return (
    <div className='p-4'>
      <Suspense fallback={<p>loadingsomething</p>}>
        <SingleNotes noteId={noteId} userId={session.user.id } noteJson={noteJson} isLiked={isLiked} isSaved={isSaved} />
      </Suspense>
    </div>
  )
}
