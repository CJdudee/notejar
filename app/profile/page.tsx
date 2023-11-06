import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import UserInfoTab from '../components/UserInfoTab'
import UserProfileNavbar from '../components/UserProfileNavbar'
import LoadingProfile from '../components/LoadingProfile'

export default async function page() {

const session = await getServerSession(options)

//console.log(session)

if(!session) return redirect('/')


    return (
      <div className='p-4 bg-slate-300 outline '>
        <UserProfileNavbar />
        <Suspense fallback={<LoadingProfile />}>
        <UserInfoTab {...session}/>
        </Suspense>
      </div>
    )
}


{/* <Suspense fallback={<p className='w-full h-20 text-center bg-slate-500 outline text-2xl'>loading user</p>}>

        <UserInfo {...session} />
        </Suspense> */}