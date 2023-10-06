

import Link from 'next/link'
import React from 'react'

export default function Notes({_id, header, content, saved, likes, user, isPrivate, createdAt, updatedAt}: {
    _id: string, 
    header: string, 
    content: string, 
    saved: number,
    likes: number, 
    user: string,
    isPrivate: boolean,
    createdAt: string,
    updatedAt: string,
}) {

    const madeAt = new Date(createdAt).toLocaleDateString('en-us', { year: '2-digit', month: '2-digit', day: 'numeric'} )
    const editedAt = new Date(updatedAt).toLocaleDateString('en-us', { year: '2-digit', month: '2-digit', day: 'numeric'} )

    const madeTime = new Date(createdAt).toLocaleTimeString('en-US')
    const editedTime = new Date(updatedAt).toLocaleTimeString('en-US')

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


  return (
    <div className='outline rounded-lg bg-gray-200 pt-4 pb-4  block mb-4 lg:mb-0 '>

      <div className='flow-root'>

      <button onClick={handleDelete} className='float-right mr-8 hover:text-red-500 p-2 pb-0 pt-0 rounded-xl bg-gray-300'>X</button>

      </div>

        <p className=' text-center mb-2 font-semibold text-lg'>title: {header}</p>

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
              </div>
                )}


        <div className='flex justify-evenly gap-2 text-center  '>

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
