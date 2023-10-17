
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

import { Session } from 'inspector'
import UserInfoTab from '../components/UserInfoTab'
import UserProfileNavbar from '../components/UserProfileNavbar'

export default async function page() {

const session = await getServerSession(options)

//console.log(session)
  

if(!session) return redirect('/')


    return (
      <div className='p-4 bg-slate-300 outline '>
        <UserProfileNavbar />
        <Suspense fallback={<p className=' p-4 text-center bg-slate-300  text-xl'>Loading</p>}>
        <UserInfoTab {...session}/>
        </Suspense>
      </div>
    )
}


{/* <Suspense fallback={<p className='w-full h-20 text-center bg-slate-500 outline text-2xl'>loading user</p>}>

        <UserInfo {...session} />
        </Suspense> */}