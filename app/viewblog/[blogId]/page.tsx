import getSingleBlog from '@/lib/getSingleBlog'
import React from 'react'
import SingleBlog from '../../components/SingleBlog'


type Params = {
  params: {
      blogId: string
  }
}

export default async function page({ params: { blogId } }: Params) {

    const blog =  getSingleBlog(blogId)

    const blogArray = await blog

    //console.log(blogArray)

    if (!blogArray) throw new Error('prolem')

  return (
    <>
    <div className='p-10'>
   {blogArray.map((r: any) => {
     return (
       <SingleBlog {...r} />
       )
      })}
      </div>
      </>
  )

}
