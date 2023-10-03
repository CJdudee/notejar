'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function AuthButton() {

const { data: session, status } = useSession()

    let content 

    //console.log(session)

    if (status === 'unauthenticated') {
        content = (
            <div>
                <button className=' text-white text-xl hover:text-green-400' onClick={() => {signIn()}}>SignIn</button>
            </div>
        )
    } else {

        content = (
            <div className='flex'>
                <Link href={`/profile`} className='rounded-xl bg-teal-400 mr-2 w-7 h-7'>
                    
                </Link>
                <button className='text-white text-xl hover:text-red-400' onClick={() => { signOut()}}>sign out</button>
            </div>
        )
    }
    

   

        return content

//   return (
//     <div>
//         {status === 'unauthenticated' ? 
//         (<button className=' text-white text-xl' onClick={() => {signIn()}}>sign in</button>): 
//         (<button className='text-white text-xl' onClick={() => { signOut()}}>sign out</button>)}
//     </div>
//   )
}
