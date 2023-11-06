'use client'
import { useSearchParams } from 'next/navigation'

export default function UserProfileNavbar() {

  const searchParams = useSearchParams()

  const search = searchParams.get('tab')

  return (
    <div className='grid grid-cols-2 grid-rows-2 md:flex justify-between  bg-slate-300 '>

    <a href='/profile' className={`text-2xl ${search === null ? 'underline' : 'hover:underline'}`} >My Notes</a>

    <a href='/profile?tab=editor' className={`text-2xl ${search === 'editor' ? 'underline': 'hover:underline'}`} >Shared Notes</a>

    <a href='/profile?tab=pending' className={`text-2xl ${search === 'pending' ? 'underline': 'hover:underline'}`} >Pending Invite</a>

    <a href='/profile?tab=profile' className={`text-2xl ${search === 'profile' ? 'underline': 'hover:underline'}`} >Profile</a>


    </div>
  )
}
