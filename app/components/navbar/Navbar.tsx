'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { JSXElementConstructor, useEffect, useRef, useState } from 'react'
import AuthButton from '../AuthButton'
import ProfileDropDownMenu from './ProfileDropDownMenu'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const [ open, setOpen ] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null); 
   
    console.log(pathname)
    useEffect(() => {

      const handler = (e: any) => {

        if (!menuRef || !menuRef.current || !menuRef.current.contains(e.target)) {
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
      <nav className='bg-slate-900 outline outline-1  py-3   '>

        <div className='flex justify-evenly'>

          {/* <Link className={`${pathname === '/' ? 'hidden invisible' : ''}text-white hover:text-gray-500 text-xl`} href='/'>Home</Link> */}
          <Link className={`${pathname === '/' ? '' : ''}text-white hover:text-gray-500 text-xl`} href='/'>Home</Link>

          <Link href='/createnote' className='text-white hover:text-gray-500 text-xl'>Create New Note</Link>
          
          <Link href='/savednotes' className='text-white hover:text-gray-500 text-xl hidden lg:block  '>Saved Notes</Link>
          
          <div ref={menuRef} className=' float-right pr-6 ' >

            <button type='button' onClick={() => setOpen(!open)} className='hover:outline hover:outline-white outline-2 rounded-xl mr-2 w-7 h-7' style={{ background: session?.user.profileColor ? session.user.profileColor : '#fff'}}/>

            {open && (
                <ProfileDropDownMenu  />
              )}

          </div>

        </div>
      
      </nav>
    )
  }
  return content
}

//fix the fucking nav button dropdown