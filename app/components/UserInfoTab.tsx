'use client'


import React, { Suspense, useEffect, useState } from 'react'
import Notes from './Notes'
import getUserPosts from '@/lib/getUserPosts'
import { useSession } from 'next-auth/react'
import { redirect, useSearchParams } from 'next/navigation'
import PendingNoteInv from './PendingNoteInv'
import EditorTab from './EditorTab'
import UserInfo from './UserInfo'
import UserProfileNavbar from './UserProfileNavbar'
import PendingTab from './PendingTab'
import UserNotesTab from './UserNotesTab'

export default function UserInfoTab({user}: {
    user: any
}) {


  const searchParams = useSearchParams()

  const search = searchParams.get('tab')

    
  let content 
    

    if (search === 'editor') {

      content = (
        <EditorTab sessionUser={user} />
      )


    } else if (search === 'pending') {

      content = (
        <PendingTab />
      )


    } else if (search === 'profile') {

        content = (
          <UserInfo user={user} />
        )

    } else {
    
      content = (
          <UserNotesTab user={user} />
      )
    }
    


    return content
  
  
}
