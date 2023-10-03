import clientPromise from '@/app/context/mongodb'
import React from 'react'
import Blogpost from '@/models/Blogpost'
import User from '@/models/User'


export default async function getBlogs() {
    const client = clientPromise
    const db = (await client).db('test') 

    const blogs = await db.collection('blogposts').find().sort({createdAt:-1}).toArray()

    //const blogs = await Blogpost.find().populate({ path: 'user', model: User})
    //const blogs = await Blogpost.find()
    
    //console.log(blogs)

    

    return blogs
}