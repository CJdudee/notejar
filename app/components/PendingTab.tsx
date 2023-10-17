'use client'

import React, { Suspense, useEffect, useState } from 'react'
import PendingNoteInv from './PendingNoteInv'

export default function PendingTab() {

    const [pendingInv, setPendingInv ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    // const pendingInvite = await fetch('http://localhost:3000/api/users/invite/pendinginvite', {cache: 'no-cache'})


    
    // const pendingJson = await pendingInvite.json()

    useEffect(() => {


      async function fetchPendingInv() {
  
        const pendingInvite = await fetch('http://localhost:3000/api/users/invite/pendinginvite', {cache: 'no-cache'})


    
        const pendingJson = await pendingInvite.json()

          setPendingInv(pendingJson)
        
        setLoading(false)
      }
  
      
  
      
  
      fetchPendingInv()
  
    }, [])

    if(!pendingInv || loading === true) {
      return <p className='p-4 text-center text-xl'>Loading</p>
    }

    if(!pendingInv.length) {
      return (

        
      <div className=''>

        <p className='text-center bg-slate-300 p-4  font-bold'> you have no pending invites</p>

      </div>
      )

       
}

        return (

        <Suspense fallback={<p className=' text-center bg-slate-300  text-xl'>Loading</p>}>

          
        <div className=''>


        <ul className='lg:grid grid-cols-2 gap-5 p-4'>
        {pendingInv.map((p: any) => {
            return (
            // <p>{p.newEditorId}</p>
            <PendingNoteInv key={p._id} {...p} />
            )
        })}
        </ul>

        </div>

        </Suspense>
      )
}
