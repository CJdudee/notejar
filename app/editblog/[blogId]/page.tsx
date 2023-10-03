

import BlogObject from '@/app/components/HomePageNotes'
import EditBlog from '@/app/components/EditBlog'

import getSingleBlog from '@/lib/getSingleBlog'
import React from 'react'

type Params = {
    params: {
        blogId: string
    }
}

export default  async function page( { params: { blogId } }: Params) {

    const blog =  getSingleBlog(blogId)

    const blogArray = await blog

    //console.log(blogArray)

    if (!blogArray) throw new Error('prolem')

  return (
    <>
    <div>
   {blogArray.map((r: any) => {
     return (
       <EditBlog {...r} />
       )
      })}
      </div>
      </>
  )
}
