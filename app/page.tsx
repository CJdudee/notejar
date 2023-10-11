import User from '@/models/User'
import Image from 'next/image'
import React from 'react'
import mongoRoute from './context/mongoroute'
import { getServerSession } from 'next-auth/next'

import getBlogs from '@/lib/getBlogs'
import BlogObject from './components/HomePageNotes'
import getUsersFetch from '@/lib/getBlogsFetch'
import { options } from './api/auth/[...nextauth]/options'
import HomePageNotes from './components/HomePageNotes'

//make sure to use await 

export default async function Home() {

  const session = await getServerSession(options)


  //console.log(session)

 //const blogs = getBlogs()

 const notes = await fetch('http://localhost:3000/api/note', { cache: 'no-cache'})

 //const blogs = fetch('http://localhost:3000/api/blog')

//const blogsArray = await blogs

const notesJson = await notes.json()





// const blogsArray = await getUsersFetch()

 //console.log(blogsArray)
// add props to get fresh data ????
//console.log(blogsArray)

  return (

    <div className='p-10 2xl:grid grid-cols-2 gap-5 '>

      
        <p className=' text-2xl mb-3  text-white underline'>HOME PAGE</p>


        {notesJson.map((b: any): any => {
          return (
            <HomePageNotes key={b._id} {...b} />
          )
        })}

    </div>
  )
}

//serverComponentsExternalPackages: ['mongoose']
