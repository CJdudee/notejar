'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'

export default function page() {

    const {data: session, status } = useSession({
        required: true,
        // onUnauthenticated() {
        //     redirect('/')
        // }
    })
    

console.log(session)

  return (
    <div>
        <p>{status}</p>
        <p></p>
    </div>
  )
}
