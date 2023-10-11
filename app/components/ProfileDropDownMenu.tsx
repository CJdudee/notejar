import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function ProfileDropDownMenu({menuRef}) {
  return (
    <div className="mt-1 origin-top-right absolute   w-48 rounded-lg shadow-sm bg-white ring-1 ring-black ring-opacity-5 visible text-center"
    ref={menuRef}>
      <ul className='text-md ' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <li className='hover:bg-gray-300 rounded-lg flex justify-evenly'>
                <Link href={`/profile`} className='w-full'>Profile</Link>
          </li>
          
          <li className='hover:bg-gray-300 rounded-lg flex justify-evenly'>
          <Link  href='/savednotes' className='lg:hidden w-full'>Saved Post</Link>
          </li>
          <li className='hover:bg-gray-300 rounded-lg flex justify-evenly'>
          <button className='text-black  w-full hover:text-red-500' onClick={() => { signOut() }}>Sign Out</button>
           </li>
           <li className='hover:bg-gray-300 rounded-lg flex justify-evenly'>
                <Link href={`/profile/settings`} className=' w-full'>Settings</Link>
          </li>
      </ul>
   </div>
  )
}