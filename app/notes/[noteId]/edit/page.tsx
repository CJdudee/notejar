'use client'

import EditNotes from '@/app/components/EditNotes'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'


type Params = {
    params: {
        noteId: string
    }
}


export default  function page({params: { noteId: postId } }: Params) {

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

  async function fetchUser() {

    const notes = await fetch(`http://localhost:3000/api/singlenote/${noteId}`, { cache: 'no-cache'})

      const noteJson = await notes.json() 

      console.log(noteJson)

      setNoteJson(noteJson)

      //console.log(noteJson)
    

  }
        
  

  if(status === 'authenticated') {

      //console.log(session?.user.name)
      
    fetchUser()
      

      //setUserStatus('authenticated')
      
      setIsLoading(false)
      
      
  }
  
}, [status])


if( isLoading === true || !noteJson || status !== 'authenticated' ) {
  return <p className='bg-slate-300 text-center pt-4 pb-4'>...Loading</p>
}

  // const notes = await fetch(`http://localhost:3000/api/singlenote/${noteId}`, { cache: 'no-cache'})

  //   const noteJson = await notes.json()

    //console.log(noteJson)

    console.log(noteJson)


    const sessionUser = session?.user.id

    //const allowed = noteJson.allowedEditor.includes(sessionUser)

    if( sessionUser != noteJson.allowedEditor.map((u: any) => { return u._id }) && sessionUser != noteJson.user ) {
      router.push('/')
    }

    // if(session.user.id !== noteJson.user) {
    //   // router.push('/')
    //   return (
    //     <p>you cannot edit this post</p>
    //   )
    // }

    


  return (
    <div className=''>
        <Suspense fallback={<p className='bg-slate-300 flex justify-center'>loading...</p>} >
            <EditNotes {...noteJson} noteId={noteId} sessionUser={sessionUser} />
        </Suspense>
    </div>
  )
}
