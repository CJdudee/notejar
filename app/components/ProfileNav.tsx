'use client'

import Link from 'next/link'
import React from 'react'

export default function ProfileNav(userId) {

    console.log(userId.userId)
    
  return (
    <div className='flex justify-evenly bg-slate-300'>
        <a href={`/profile/${userId.userId}`}>Notes</a>
        <a href={`/profile/${userId.userId}?tab=profile`}>Profile</a>
    </div>
  )
}
