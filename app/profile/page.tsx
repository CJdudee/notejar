
// we made this a client so we can pass the session to the api with getServerSession
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { Suspense } from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import getUserInfo from '@/lib/getUserInfo'
import getUserPosts from '@/lib/getUserPosts'

import Notes from '../components/Notes'
import getSearchParam from '@/lib/getSearchParam'
import reloadSession from '@/lib/reloadSession'
import UserInfo from '../components/UserInfo'
import UserPostsInfo from '../components/UserPostsInfo'
import { Session } from 'inspector'

export default async function page() {

const session = await getServerSession(options)

console.log(session)
  

if(!session) return <p>no session found</p>
    //const session = await getServerSession(options)

    //reloadSession()

  //   const {data: session, status } = useSession({
  //     required: true,
  //     onUnauthenticated() {
  //         redirect('/')
  //     }
  // })

    //  if( status === 'unauthenticated') redirect('/')


    // console.log(status)

    
   //if( status === 'loading') return <p>loading</p>

  // if( status === 'authenticated') {

 
  // const user = getUserInfo(session.user.id)

  
  // const notes = getUserPosts(session.user.id)



  // const userJson = await getUserInfo(session.user.id)

  
  // const notesJson = await getUserPosts(session.user.id)

  // const [ userJson, notesJson ] = await Promise.all([user, notes])

    

  //   //console.log(userJson)
  //   console.log(notesJson)

  //   const { username, roles } = userJson



    return (
      <div>
        <Suspense fallback={<p className='w-full h-20 text-center bg-slate-500 outline text-2xl'>loading user</p>}>

        <UserInfo {...session} />
        </Suspense>

        <Suspense fallback={<p className=' w-full h-20 text-center bg-slate-300 outline text-2xl'>loading</p>}>
        <UserPostsInfo {...session}/>
        </Suspense>
      </div>
    )

  // return (
  //   <div className='h-full'>
  //     <div className='outline flex h-40 bg-slate-500'>

  //       <p className='m-4 text-2xl font-semibold'>{ username }</p>
  //     </div>

  //     <div className='outline p-4 bg-slate-300 '>
  //       <p className='text-2xl underline'>Notes</p>
  //       <ul className='grid grid-cols-2 gap-5 p-4 '>
  //         {notesJson.map((n: any) => {
  //           return (
  //             <Notes {...n}/>
  //           )
  //         })}
  //       </ul>

  //     </div>
  //   </div>
  // )

        //}
}
