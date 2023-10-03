import clientPromise from '@/app/context/mongodb'
import { ObjectId } from 'bson'
import React from 'react'

export default async function getSingleBlog(blogId: string) {
  
    const client = clientPromise
    const db = (await  client).db('test') 

    const blogs = await db.collection('blogposts').find( {_id: new ObjectId(blogId) } ).toArray()

    return blogs

}


//64cca2cee60b78c0a1d5b5c5