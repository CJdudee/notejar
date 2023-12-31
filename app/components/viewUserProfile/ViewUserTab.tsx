'use client'

import getUserInfo from '@/lib/getUserInfo'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import ViewUserNotes from './ViewUserNotes'
import LoadingProfile from '../LoadingProfile'

export default function ViewUserTab({userId}) {
    const [ isLoading , setIsLoading ] = useState(true)
    
    const [ user, setUserJson ] = useState<any>()
  
    const {data: session, status } = useSession()
  
    const searchParams = useSearchParams()

    const search = searchParams.get('tab')
  
    const router = useRouter()
  
    useEffect(() => {

      if(!userId) return null

      async function fetchUser() {
        const user = await getUserInfo(userId)
  
        setUserJson(user)
        setIsLoading(false)
      }

      fetchUser()
      
    }, [userId])
    
    if (isLoading === true) {
      return (
        <LoadingProfile />
      )
    }

    if(!user) {
        return (
            <div className='bg-slate-300 text-center text-xl p-4'>
                <p>No User Was Found</p>
            </div>
        )
    }
    
    // if(isLoading) return <p> loading</p>
    
    const sessionUser = session?.user?.id
  
      if (sessionUser === user._id) {
        router.push('/profile')
      }
      
      //console.log(search)
      //console.log(status)
      
      let content 
      
      console.log(user)
  
      if(search === 'profile' && user ) {

        const { username, roles } = user

        content = (
            <div className='m-3'>
              <div className=' outline outline-1 flex h-40 bg-slate-300 gap-1 p-2'>
                <p className='mt-1 text-2xl font-semibold'>User: {username}</p>
                <div style={{background: user.profileColor}} className='h-7 w-7 rounded-xl'/>
              </div>
            </div>
          )
      } else {
        content = (
          <ViewUserNotes user={user} userId={userId} />
        )
      }
  
    return content
        
    
}


// useEffect(() => {
  
  
//     async function fetchUser() {

//       const user = await getUserInfo(userId)

//       setUserJson(user)
      

//     }

//     async function fetchNotes() {

//       const notes = await getUserPosts(userId)

//       setNotesJson(notes)

//     }

//     async function fetchResult() {

//       await fetchNotes()
//       await fetchUser()
//       setIsLoading(false)

//     }



//     fetchResult()


    
    
    
//   }, [])