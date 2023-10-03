


import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import HomePageTipTap from './HomePageTipTap'

export default function HomePageNotes({header, content, createdAt, updatedAt, _id, user }: {
  header: string,
  content: string,
  createdAt: string,
  updatedAt: string, 
  user: any,
  _id: string
}) {



    const madeAt = new Date(createdAt).toLocaleDateString('en-us', {weekday: "long", year: 'numeric', month: 'short', day: 'numeric'} )
    const editedAt = new Date(updatedAt).toLocaleDateString('en-us', {weekday: "long", year: 'numeric', month: 'short', day: 'numeric'} )

    const madeTime = new Date(createdAt).toLocaleTimeString('en-US')
    const editedTime = new Date(updatedAt).toLocaleTimeString('en-US')
    //console.log(madeAt)
  return (
    <div className='bg-slate-200  p-10 rounded-md outline mb-4'>

      <div className='flow-root'>

        <Link href={`/viewblog/${_id}`} className='text-2xl flex mb-5  hover:text-gray-500 float-left '>Title: {header}</Link>

        <Link href={`/profile/${user._id}`} className='text-2xl hover:text-gray-500 float-right'>By: {user.username}</Link>

      </div>



        <div className='outline p-4 rounded-md'>


          <HomePageTipTap text={content} />

        {/* {content.length < 50
        ? (<p>{content}</p>)
        : (<p>{content.substring(0,200)}...</p>)} */}

        {/* {content.length < 200  */}
        {/* ? (<p>{content}</p>) */}
        {/* : (<p>{content.slice(0, 197)}...</p>)} */}
        

          <div className='grid grid-cols-2 mt-4'>

        

        <p className=' text-start  text-sm font-light'>Created At: {madeAt} : {madeTime}</p>

        {madeTime === editedTime ?
         null : 
         (<p className='  text-end text-sm font-light '>Updated At: {editedAt} : {editedTime}</p>)} 
        
          </div>

        </div>

        
        <div className='text-center   mt-8 '>

        <Link href={`/notes/${_id}`} className='outline p-2 mt-5 rounded-md hover:bg-gray-300 '>View</Link>
        </div>
    </div>
  )
}
