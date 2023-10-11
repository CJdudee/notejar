import Link from 'next/link'
import React from 'react'

export default function SavedNotes({_id, header, content, saved, likes, user, isPrivate, createdAt, updatedAt}: {
    _id: string, 
    header: string, 
    content: string, 
    saved: number,
    likes: number, 
    user: any,
    isPrivate: boolean,
    createdAt: string,
    updatedAt: string,
}) {

    const madeAt = new Date(createdAt).toLocaleDateString('en-us', { year: '2-digit', month: '2-digit', day: 'numeric'} )
    const editedAt = new Date(updatedAt).toLocaleDateString('en-us', { year: '2-digit', month: '2-digit', day: 'numeric'} )

    const madeTime = new Date(createdAt).toLocaleTimeString('en-US')
    const editedTime = new Date(updatedAt).toLocaleTimeString('en-US')

    

    console.log(user)


  return (
    <div className='outline rounded-lg bg-gray-200 pt-4 pb-4  block mb-4 lg:mb-0 '>

        <div className='flow-root'>

        <p className=' text-center mb-2 font-semibold text-lg float-left ml-4'>title: {header}</p>

        <Link href={`/profile/${user._id}`} className='mb-2 font-semibold text-lg float-right mr-4 hover:text-gray-600'>By: {user.username}</Link>

        <p></p>
        </div>

        <div className='grid  grid-flow-col gap-1 mb-4'>



        
        
       
            
                


       
        <div className='flex justify-evenly gap-2 text-center static '>

        <p>Created: {madeAt} : {madeTime} </p>
        <p>Updated: {editedAt} : {editedTime} </p>


        </div>


        

        </div>
        
        <div className='pr-4 pl-4 mt-4  flex justify-center'>


        <Link className='w-1/3 mb-4 outline outline-teal-600  outline-2 outline-offset-1 rounded-lg hover:bg-gray-100 text-center ' href={`/notes/${_id}`}>View note</Link>

        </div>

        <div className='flex justify-end static  '>
                
                <p className='float-right mr-10'>likes: {likes}</p>
              </div>

    </div>
  )
}