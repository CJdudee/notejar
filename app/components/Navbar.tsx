'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import AuthButton from './AuthButton'
import ProfileDropDownMenu from './ProfileDropDownMenu'

export default function Navbar() {

  const { data: session, status } = useSession()

  const [ open, setOpen ] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null);  

    useEffect(() => {

      const handler = (e) => {

        if (!menuRef.current || !menuRef.current.contains(e.target)) {
          setOpen(false)
        }

      }
      
      document.addEventListener('mousedown', handler )

      return () => {
        document.removeEventListener('mousedown', handler)
      }


    })

  let content 

  if(status == 'unauthenticated') {
    content = (
      <nav className='bg-slate-900 outline outline-1  pt-3 pb-3 flex justify-evenly '>
        <Link className='text-white hover:text-gray-500 text-xl' href='/'>Home</Link>
        <Link href={`/newuser`} className='text-white hover:text-gray-500 text-xl'>SignUp</Link>
        <AuthButton />
      </nav>
    )
  } else {
    content = (
      <nav className='bg-slate-900 outline outline-1  pt-3 pb-3   '>
        <div className='flex justify-evenly'>

        <Link className='text-white hover:text-gray-500 text-xl' href='/'>Home</Link>

        {/* <Link href='/createblog' className='text-white hover:text-gray-500 text-xl' >Make new blog post</Link> */}
        <Link href='/createnote' className='text-white hover:text-gray-500 text-xl'>Create New Note</Link>
        {/* <Link href={`/profile`} className='rounded-xl bg-teal-400 mr-2 w-7 h-7'/> */}
        {/* <AuthButton /> */}

        <Link href='/savednotes' className='text-white hover:text-gray-500 text-xl hidden lg:block  '>Saved Notes</Link>

        <div className=' float-right pr-10' >

          <button type='button' onClick={() => setOpen(!open)} className='rounded-xl bg-purple-400 mr-2 w-7 h-7'/>
           


    {open && (
                    <ProfileDropDownMenu menuRef={menuRef} />
                )}

        </div>

        </div>
                                    
      </nav>
    )
  }
  return content
}