import Link from 'next/link'
import React from 'react'

export default function PendingNoteInv({noteId, userId, _id}: {
    noteId: any
    userId: any
    _id: string
}) {

    const {header, isPrivate, saved, likes} = noteId
    const { username, profileColor, _id:noteUserId } = userId


    async function handlerAccept() {
        const response = await fetch(`http://localhost:3000/api/users/invite/pendinginvite/${_id}`, {
            method: 'PATCH'
        })

        if(!response.ok){
            throw new Error('problem with accept')
        }

        window.location.reload();
    }

    async function handlerDelete() {
        const response = await fetch(`http://localhost:3000/api/users/invite/pendinginvite/${_id}`, {
            method: 'DELETE'
        })

        if(!response.ok) {
            throw new Error('problem with delete')
        }

        window.location.reload();
    }




  return (
    <div className='outline rounded-lg bg-gray-200 pt-4 pb-4  block mb-4 lg:mb-0'>

        <div className='flow-root mb-4'>

        <p className='ml-6 font-bold text-xl float-left'>Title: {header}</p>

        <div className='float-right mr-6 flex gap-2'>

<Link href={`/profile/${noteUserId}`} className='  text-xl font-bold hover:text-gray-700 '>Invited By: {username}</Link>

        <div className='w-7 h-7 rounded-xl' style={{background: profileColor ? profileColor : '#fff'}}/>

        </div>

        </div>

        {isPrivate ? 
        (<div className='mb-4'>
            <p className='flex justify-center '>Is Private: True</p>
            </div>)
            : 
            (<div className='flex justify-evenly mb-4'>
                <p>Is Private: False</p>
                <p>saved: {saved}</p>
                <p>likes: {likes}</p>
              </div>
        )}

        <div className='w-full flex justify-evenly mt-4'>
            <button onClick={handlerAccept} type='button' className='w-1/3 outline rounded-md outline-green-500 hover:bg-green-100'>Accept</button> 
            <button onClick={handlerDelete} type='button' className='w-1/3 outline rounded-md outline-red-500 hover:bg-red-200'>Decline</button> 
        </div>

    </div>
  )
}
