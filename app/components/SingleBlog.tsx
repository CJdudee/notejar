import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function SingleBlog({title, content, createdAt, updatedAt, _id }: {
  title: string, 
  content: string, 
  createdAt: string,
  updatedAt: string,
  _id: string
}) {



    const madeAt = new Date(createdAt).toLocaleDateString('en-us', {weekday: "long", year: 'numeric', month: 'short', day: 'numeric'} )
    const editedAt = new Date(updatedAt).toLocaleDateString('en-us', {weekday: "long", year: 'numeric', month: 'short', day: '2-digit'} )

    const madeTime = new Date(createdAt).toLocaleTimeString('en-US')
    const editedTime = new Date(updatedAt).toLocaleTimeString('en-US')
    //console.log(madeAt)
  return (
    <div className='bg-slate-200 text-center p-10 rounded-md outline mb-4'>
        <h2 className='text-2xl text-start mb-5 '>{title}</h2>

        <div className='outline p-10 rounded-md'>

        <p className='pb-10'>{content}</p>


        <div className='grid grid-cols-2 mt-4'>

        <p className='text-start  text-sm font-light'>Created At: {madeAt} : {madeTime}</p>

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
