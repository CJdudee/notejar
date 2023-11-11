

import { date_format, time_format } from '@/utils/helpers'
import Link from 'next/link'
import React from 'react'

export default function ProfileNotes({_id, header,  saved, likes,  createdAt, updatedAt}: {
    _id: string, 
    header: string, 
    content: string, 
    saved: number,
    likes: number, 
    user: any,
    isPrivate: boolean,
    createdAt: Date,
    updatedAt: Date,
}) {

    const madeAt = date_format(createdAt)
    const editedAt = date_format(updatedAt)
    const madeTime = time_format(createdAt)
    const editedTime = time_format(updatedAt)
    
  return (
    <div className='outline rounded-lg bg-gray-200 pt-4 pb-4  block mb-4 lg:mb-0 '>

      <div className='flow-root'>
        <p className=' float-none text-center mb-3 font-semibold text-xl  '>title: {header}</p>
      </div>

      <div className='grid  grid-flow-col gap-1 mb-4'>
        <div className='block md:flex justify-evenly gap-2 text-center static font-semibold '>
          <p>Created: {madeAt} : {madeTime} </p>
          <p>Updated: {editedAt} : {editedTime} </p>
        </div>
      </div>
      
      <div className='pr-4 pl-4 mt-5  flex justify-center'>
        <Link className='outline w-1/4 p-2 rounded-md hover:bg-gray-300 text-center  outline-1' href={`/notes/${_id}`}>View Note</Link>
      </div>

      <div className='flex justify-end static   '>
        <p className='float-right mr-10 font-bold'>Likes: {likes}</p>
      </div>

    </div>
  )
}
