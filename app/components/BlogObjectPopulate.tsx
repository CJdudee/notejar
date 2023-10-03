import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BlogObject({title, content, createdAt, updatedAt, _id, user }: {
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string, 
  _id: string,
  user: any
}) {



    const madeAt = new Date(createdAt).toLocaleDateString('en-us', {weekday: "long", year: 'numeric', month: 'short', day: 'numeric'} )
    const editedAt = new Date(updatedAt).toLocaleDateString('en-us', {weekday: "long", year: 'numeric', month: 'short', day: 'numeric'} )

    const madeTime = new Date(createdAt).toLocaleTimeString('en-US')
    const editedTime = new Date(updatedAt).toLocaleTimeString('en-US')
    //console.log(madeAt)
  return (
    <div className='bg-slate-200 text-center p-10 rounded-md outline mb-4'>
        <Link href={`/viewblog/${_id}`} className='text-2xl flex mb-5  hover:text-gray-500  '>{title}</Link>

        <p>{user.username}</p>

        <div className='outline p-10 rounded-md'>

        {/* {content.length < 50
        ? (<p>{content}</p>)
        : (<p>{content.substring(0,200)}...</p>)} */}

        {content.length < 200 
        ? (<p>{content}</p>)
        : (<p>{content.slice(0, 197)}...</p>)}
        

          <div className='grid grid-cols-2 mt-4'>

        

        <p className=' text-start  text-sm font-light'>Created At: {madeAt} : {madeTime}</p>

        {madeTime === editedTime ?
        null :
        (<p className='  text-end text-sm font-light '>Updated At: {editedAt} : {editedTime}</p>)}
        
          </div>

        </div>
        <div className='text-start mt-5'>

        <Link href={`/editblog/${_id}`} className='outline p-2 mt-5 rounded-md'>Edit</Link>
        </div>
    </div>
  )
}
