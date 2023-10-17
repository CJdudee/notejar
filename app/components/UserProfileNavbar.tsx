import React from 'react'

export default function UserProfileNavbar() {
  return (
    <div className='flex justify-between px-4 bg-slate-300'>

    <a href='/profile' className='hover:underline text-2xl' >Notes</a>
    <a href='/profile?tab=editor' className='hover:underline text-2xl' >Editor</a>
    <a href='/profile?tab=pending' className='hover:underline text-2xl' >Pending</a>
    <a href='/profile?tab=profile' className='hover:underline text-2xl' >Profile</a>


    </div>
  )
}
