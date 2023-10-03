



import getUserInfo from '@/lib/getUserInfo'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function UserInfo({ user } : {
    user: any
}) {

    // const {data: session, status } = useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         redirect('/')
    //     }
    // })

    const { id } = user

    //console.log(id)



    const userinfo = await getUserInfo(id)

    console.log(userinfo)

    const { username, roles } = userinfo
  return (
    <div className='outline flex h-40 bg-slate-500'>

        <p className='m-4 text-2xl font-semibold'>{ username }</p>
      </div>
  )
}
