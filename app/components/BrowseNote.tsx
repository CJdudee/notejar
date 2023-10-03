import Link from 'next/link'
import React from 'react'

export default function BrowseNote({_id, header, user, saved, likes}: {
    _id: string,
    header: string,
    user: any,
    saved: number,
    likes: number,
}) {
  return (
    <div className='outline outline-white p-3 m-1 mt-4 flex'>

        <div className=' items-stretch '>

            <Link href={`/notes/${_id}`} className=' text-white text-2xl hover:text-slate-300  '>{header}</Link>
        </div>

        <div className=' flex-end flex-grow  '>
            <p className='text-end text-white'>By: {user.username}</p>
            <p className='text-end  text-white'> likes: {likes}</p>
        </div>
            
        </div>
  )
}
