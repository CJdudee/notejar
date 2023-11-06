'use client'

import LoadingProfile from '@/app/components/LoadingProfile'
import SingleNotes from '@/app/components/SingleNotes'
import { useSession } from 'next-auth/react'
import { Suspense, useEffect, useState } from 'react'



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
    

    //console.log(session)

    if (isLoading === true || status === 'loading'  || !noteJson?.liked_by ) {
      return (
        <div className='p-4 bg-slate-300 '>
          <p className='text-center text-xl bg-slate-300'>Loading</p>
        </div>
      )
    }


    if(!noteJson) {
      return (
        <div>
          <p>Note is Private</p>
        </div>
      )
    }

    // if(noteJson.allowedEditor != session.user.id) {
    //   return (
    //     <div>
    //       <p>not allowed</p>
    //     </div>
    //   )
    // }

    if(noteJson?.liked_by) {
      var isLiked = noteJson.liked_by.includes(session.user.id)
    }

    //console.log(noteJson)

   
  return (
    <div className=''>
      <Suspense fallback={<LoadingProfile />}>
        <SingleNotes noteId={noteId} userId={session.user.id } noteJson={noteJson} isLiked={isLiked} isSaved={isSaved} />
      </Suspense>
    </div>
  )
}
