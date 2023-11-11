'use client'

import EditNotes from '@/app/components/EditNotes'
import LoadingProfile from '@/app/components/LoadingProfile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'


type Params = {
    params: {
        noteId: string
    }
}


export default function Page({params: { noteId: postId } }: Params) {

  const {data: session, status } = useSession({ 
    required: true, 
    onUnauthenticated() {
        router.push('/')
    }
})

  const [isLoading, setIsLoading ] = useState(true)
  // const [userStatus, setUserStatus ] = useState('loading')
  const [ noteJson, setNoteJson ] = useState<any>()

  const noteId = postId
  
  const router = useRouter()

  useEffect(() => {
    if(!noteId) return 

  async function fetchUser() {
    const notes = await fetch(`${process.env.NEXT_URL}/api/singlenote/${noteId}`, { cache: 'no-cache'})

      const noteJson = await notes.json() 
      setNoteJson(noteJson)
    }
        
  
  if(status === 'authenticated') {
      
    fetchUser()
    
    setIsLoading(false)
  }
  
}, [status, noteId])


  if( isLoading === true || !noteJson || status !== 'authenticated' ) {
    return <LoadingProfile /> 
  }
    // const notes = await fetch(`http://localhost:3000/api/singlenote/${noteId}`, { cache: 'no-cache'})
    // const noteJson = await notes.json()

    //console.log(noteJson)

    const sessionUser = session?.user.id

    //const allowed = noteJson.allowedEditor.includes(sessionUser)
    if( sessionUser != noteJson.allowedEditor.map((u: any) => { return u._id }) && sessionUser != noteJson.user ) {
      router.push('/')
    }
    
  return (
    <div className=''>
        <Suspense fallback={<LoadingProfile />} >
            <EditNotes {...noteJson} noteId={noteId} sessionUser={sessionUser} />
        </Suspense>
    </div>
  )
}
