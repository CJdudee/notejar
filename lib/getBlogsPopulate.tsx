import clientPromise from '@/app/context/mongodb'
import React from 'react'
import Blogpost from '@/models/Blogpost'
import User from '@/models/User'
import mongoRoute from '@/app/context/mongoroute'

// i think using the mongoRoute that the function is being called mutliple times and is making me get a maximum call stack size exceeded error and for some reason the client promise doesn't work unless i use it specifcly to call the find method




export default async function getBlogsPopulate() {
    
    // const client = clientPromise
    // const db = (await client).db('test') 

    try {
        const client = mongoRoute() 
        
    } catch (error) {
        console.log('error with connecting mongo')
    }




    //const callblogs = await db.collection('blogposts').find().sort({createdAt:-1}).toArray()

    const blogs = await Blogpost.find().populate({ path: 'user', model: User}).exec()
    //const blogs = await Blogpost.find()
    
     //console.log(blogs)

    

    return blogs
}