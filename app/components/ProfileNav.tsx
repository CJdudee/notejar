'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function ProfileNav(userId) {

    console.log(userId.userId)

    const searchParams = useSearchParams()

    const search = searchParams.get('tab')
    
  return (
    <div className='flex justify-evenly bg-slate-300 text-xl'>
        <a className={`${search === null ? 'underline' : 'hover:underline'}`} href={`/profile/${userId.userId}`}>Notes</a>
        <a className={`${search === "profile" ? 'underline' : 'hover:underline'}`} href={`/profile/${userId.userId}?tab=profile`}>Profile</a>
    </div>
  )
}
