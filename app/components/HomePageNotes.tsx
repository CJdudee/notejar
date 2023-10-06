


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
    <div className='bg-slate-200  p-10 pb-8 rounded-md outline mb-4'>

      <div className='flow-root'>

        <Link href={`/notes/${_id}`} className='text-2xl flex mb-5  hover:text-gray-500 float-left '>Title: {header}</Link>

        <Link href={`/profile/${user._id}`} className='text-2xl hover:text-gray-500 float-right'>
          <div className='flex gap-2'>

          <p>By: {user.username}</p>
            
          <div style={{ background: user.profileColor ?  user.profileColor : '#fff' }} className='rounded-xl w-7 h-7 ' />

          </div>
        </Link>

        {/* <button type='button' onClick={() => setOpen(!open)} className='rounded-xl bg-purple-400 mr-2 w-7 h-7'/> */}

      </div>



        <div className='  rounded-md'>


          {/* <HomePageTipTap text={content} /> */}

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

        
        <div className='text-center   mt-8 w-full  '>

        <Link href={`/notes/${_id}`} className=' outline p-2 mt-5 rounded-md outline-offset-4 hover:bg-gray-300 pr-10 pl-10'>View</Link>
        </div>
    </div>
  )
}
