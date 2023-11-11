'use client'

import { useSearchParams } from 'next/navigation'
import EditorTab from './EditorTab'
import PendingTab from './PendingTab'
import UserInfo from './UserInfo'
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
