import { date_format, time_format } from '@/utils/helpers'
import Link from 'next/link'
import React from 'react'

export default function SavedNotes({_id, header, content, saved, likes, user, isPrivate, createdAt, updatedAt, savedAt}: {
    _id: string, 
    header: string, 
    content: string, 
    saved: number,
    likes: number, 
    user: any,
    isPrivate: boolean,
    createdAt: Date,
    updatedAt: Date,
    savedAt: any
}) {

    const madeAt = date_format(createdAt)
    const editedAt = date_format(updatedAt)
    const savedDate = date_format(savedAt)


    const madeTime = time_format(createdAt)
    const editedTime = time_format(updatedAt)
    const savedTime = time_format(savedAt)


  return (
    <div className='outline rounded-lg bg-gray-200 pt-4 pb-4  block mb-4 lg:mb-0 '>

        <div className='flow-root mb-3'>

          <p className=' text-center mb-2 font-semibold text-lg float-left ml-4'>title: {header}</p>

          <Link href={`/profile/${user._id}`} className='mb-2 font-semibold text-lg float-right mr-4 hover:text-gray-600'>By: {user.username}</Link>

        <p></p>
        </div>

        <div className='flex justify-evenly gap-2 text-center static '>

          <p>Created: {madeAt} : {madeTime} </p>
          <p>Updated: {editedAt} : {editedTime} </p>


        </div>

        
        <div className='pr-4 pl-4 mt-4  flex justify-center'>


          <Link className='w-1/3  outline outline-teal-600  outline-2 outline-offset-1 rounded-lg hover:bg-gray-100 text-center ' href={`/notes/${_id}`}>View note</Link>

        </div>

        

        <div className='flow-root mt-4  '>

          <p className='float-left ml-8 font-semibold'>Saved At: {savedDate} : {savedTime}</p>

          <p className='float-right mr-10 font-semibold'>likes: {likes}</p>
        </div>

    </div>
  )
}
