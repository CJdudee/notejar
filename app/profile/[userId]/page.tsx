'use client'

import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { Suspense, useEffect, useState } from 'react'
import { options } from '../../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import getUserInfo from '@/lib/getUserInfo'
import getUserPosts from '@/lib/getUserPosts'

import Notes from '../../components/Notes'
import getSearchParam from '@/lib/getSearchParam'

import { useSearchParams } from 'next/navigation'
import ProfileNav from '@/app/components/ProfileNav'
import ProfileNotes from '@/app/components/ProfileNotes'
import { useRouter } from 'next/navigation'

type Params = {
    params: {
        userId: string
    }
}


export default  function page( {params: { userId } }: Params) {

  const [ isLoading , setIsLoading ] = useState(true)
  const [ notes, setNotesJson ] = useState<any>()
  const [ user, setUserJson ] = useState<any>()

 const {data: session, status } = useSession()

 const searchParams = useSearchParams()

 const router = useRouter()

 useEffect(() => {


    async function fetchUser() {

      const user = await getUserInfo(userId)

      setUserJson(user)
      

    }

    async function fetchNotes() {

      const notes = await getUserPosts(userId)

      setNotesJson(notes)

    }

    async function fetchResult() {

      await fetchNotes()
      await fetchUser()
      setIsLoading(false)

    }



    fetchResult()


    
    
    
  }, [])
  

  
  
  if (isLoading === true || !notes ||!user ) {
    return (
      <div className='p-4  w-full bg-slate-300'>

    <p className='text-center'>...Loading</p>
    
      </div>
    )
  }
  
  // if(isLoading) return <p> loading</p>
  
  const sessionUser = session?.user?.id

    if (sessionUser === user._id) {
      router.push('/profile')
    }
    
    
    
   

    
    
    
    
    
    const search = searchParams.get('tab')
    
    //console.log(search)
    //console.log(status)
    
    let content 
    
     //const user = await getUserInfo(userId)
    

    // if (!notesJson) {
    //   return (
    //     <div>
    //         <p>no user found</p>
    //       </div>
    //   )
    // }
    
    // if (sessionUser === user._id) {
    //     router.push('/profile')
    // }
    
    console.log(user)

    if(search === 'profile' && user ) {

      //const notes = await getUserPosts(userId)

      //console.log(notes)
      const { username, roles } = user
      if( user ) {

        content = (

          
          <Suspense fallback={<p>loadingsomething</p>}>
          <div className='h-full'>
  
          <ProfileNav userId={userId} />
        <div className='outline flex h-40 bg-slate-300'>
  
  
          <p className='m-4 text-2xl font-semibold'>{username}</p>
        </div>
  
        
      </div>
        </Suspense>
        )
      } else {
        content = (
          <div>
            <p>no user found</p>
          </div>
        )
      }

      
    } else {

      content = (
        <>
          
          <p className='text-black text-xl bg-slate-300 text-center'>{user.username}</p>

          <ProfileNav userId={userId} />

            <div className='bg-slate-300'>
              <p className='text-2xl underline text-center'>Notes</p>
              <ul className='lg:grid grid-cols-2 gap-4 p-2 '>
              {notes.map((n: any) => {
                return (
                <ProfileNotes {...n}/>
                )
              })}
              </ul>
            </div>
        </>
      )

      

      

    }

    

 
    //const session = await getServerSession(options)
    //console.log(session)

    //if(!session) redirect('/')


    // console.log(session)
  

    

    
    //const notes = getUserPosts(userId)

    //const [userJson, notesJson ] = await Promise.all([user, notes])
    

    

    //console.log(userJson)
    //console.log(notesJson)

    

  return content
}
