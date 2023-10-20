import React, { Suspense, useEffect, useState } from 'react'
import Notes from './Notes'

export default function EditorTab({sessionUser}) {

    const [isLoading, setIsLoading] = useState(true)
    const [inviteNoteJson, setInviteNoteJson] = useState([])

    useEffect(() => {


        async function fetchNoteInvite() {
    
            const invitedNote = await fetch('http://localhost:3000/api/users/invite', { cache: 'no-cache'})

            const invitedNoteJson = await invitedNote.json()

            setInviteNoteJson(invitedNoteJson)
          
    
        }
    
        
    
        async function fetchResult() {
    
          await fetchNoteInvite()
          
          setIsLoading(false)
    
        }
    
        fetchResult()
    
      }, [])

    // const invitedNote = await fetch('http://localhost:3000/api/users/invite', { cache: 'no-cache'})

    //   const invitedNoteJson = await invitedNote.json()

      if(!inviteNoteJson || isLoading === true) {
        return (
          <div className='p-4'>
            
          <p className='text-center bg-slate-300 text-xl '> Loading </p>
          </div>
        )
      }

      if(!inviteNoteJson.length) {
        return (
          <div className='outline p-4 bg-slate-300'>

          <p className='text-center bg-slate-300 p-4  font-bold'> you are not invited to any notes</p>

          </div>
        )
      }

      return (
        <Suspense fallback={<p className='bg-slate-300 text-center text-xl p-4'>Loading</p>}>
        <div className=''>

          

          <ul className='lg:grid grid-cols-2 gap-5 p-4'>
            {inviteNoteJson.map((n: any) => {
              
              return (
                <Notes key={n._id} sessionUser={sessionUser} {...n} />
              )
            })}
          </ul>

        </div>
        </Suspense>
      )
  
}
