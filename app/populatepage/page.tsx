import getBlogsPopulate from '@/lib/getBlogsPopulate'
import React from 'react'
import BlogObject from '../components/HomePageNotes'

export default async function page() {

    // const blogs = getBlogsPopulate()

    const blogs = await fetch('http://localhost:3000/api/blog', { cache: 'no-cache'})

    const blogsArray = await blogs.json()

    // const blog = blogsArray.blogs

    //console.log(blogsArray)

  return (
    <div className='p-10'>
        {blogsArray.map((b: any) => {
          return (
            <BlogObject key={b._id} {...b} />
          )
        })}
    </div>
  )
}
