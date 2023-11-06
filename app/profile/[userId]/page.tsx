

import { getServerSession } from 'next-auth'
import { Suspense, } from 'react'
import { options } from '../../api/auth/[...nextauth]/options'


import ProfileNav from '@/app/components/ProfileNav'
import ViewUserTab from '@/app/components/ViewUserTab'

type Params = {
    params: {
        userId: string
    }
}


export default async function page( {params: { userId } }: Params) {

  //const session = await getServerSession(options)

  return (
    <div className='p-4 bg-slate-300 outline '>
        <ProfileNav userId={userId} />
        <Suspense fallback={<p className=' p-4 text-center bg-slate-300  text-xl'>Loading</p>}>
        <ViewUserTab userId={userId} />
        </Suspense>
      </div>
  )
  
}
