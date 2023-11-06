

import { date_format, time_format } from '@/utils/helpers'
import Link from 'next/link'
import React from 'react'

export default function Notes({_id, header, content, saved, likes, user, isPrivate, createdAt, updatedAt, sessionUser}: {
    _id: string, 
    header: string, 
    content: string, 
    saved: number,
    likes: number, 
    user: any,
    isPrivate: boolean,
    createdAt: Date,
    updatedAt: Date,
    sessionUser: any,
}) {

    const madeAt = date_format(createdAt)
    const editedAt = date_format(updatedAt)

    const madeTime = time_format(createdAt)
    const editedTime = time_format(updatedAt)

    async function handleDelete() {


      try {
        const response = await fetch(`http://localhost:3000/api/singlenote/${_id}`, {
        method: 'DELETE',
      })

      if(!response.ok) {
        throw new Error('problem with delete')
      }
        
      } catch (error) {
        console.log('problem with delete')
      }

      window.location.reload()

    }


    let titleAndUser 

    if (user?.username) {

      titleAndUser = (
        <div className='flex justify-evenly w-full mb-2 mx-auto '>

          <p className=' text-start mb-2 font-semibold text-lg '>Title: {header}</p>
          <p className=' text-start mb-2 font-semibold text-lg '>User: {user.username}</p>

        </div>
      )
    } else {
      titleAndUser = (
        <p className=' text-center mb-2 font-semibold text-lg '>Title: {header}</p>
      )
    }
      
    // if (sessionUser.id == user) {
    //   titleAndUser = (
    //     <p className=' text-center mb-2 font-semibold text-lg '>title: {header}</p>
    //   )
    // } else {
    //   titleAndUser = (
    //     <div className='flex justify-evenly w-full mb-2 mx-auto '>


    //       <p className=' text-start mb-2 font-semibold text-lg '>title: {header}</p>
    //       <p className=' text-start mb-2 font-semibold text-lg '>User: {user.username}</p>

    //     </div>
    //   )
    // }




  return (
    <div className='outline rounded-lg bg-gray-200 pt-4 pb-4  block mb-4 lg:mb-0 '>

      <div className='flow-root'>

        <button onClick={handleDelete} className='float-right mr-8 hover:text-red-500 p-2 pb-0 pt-0 rounded-xl bg-gray-300'>X</button>

      </div>

        {titleAndUser}
        

      <div className='grid grid-rows-2 gap-1 mb-4'>

        {isPrivate ? 
        (<div className='mb-1'>
          <p className='flex justify-center '>Is Private: True</p>
        </div>)
          : 
        (<div className='flex justify-evenly mb-1'>
          <p>Is Private: False</p>
          <p>saved: {saved}</p>
          <p>likes: {likes}</p>
        </div>)}


        <div className='block md:flex justify-evenly gap-2 text-center px-2 font-semibold  '>
          <p>Created: {madeAt} : {madeTime} </p>
          <p>Updated: {editedAt} : {editedTime} </p>
        </div>

      </div>
        
      <div className='pr-4 pl-4 mt-4  flex justify-evenly'>


        <Link className='w-1/3 mb-4 outline outline-teal-600  outline-2 outline-offset-1 rounded-lg hover:bg-gray-100 text-center ' href={`/notes/${_id}`}>View note</Link>
        
        <Link className='w-1/3 mb-4 outline outline-orange-500  outline-2 outline-offset-1 rounded-lg hover:bg-orange-100 text-center ' href={`/notes/${_id}/edit`}>Edit</Link>

      </div>

    </div>
  )
}
