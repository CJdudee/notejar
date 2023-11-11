import { NextRequest, NextResponse } from 'next/server';
import React from 'react'
import mongoose from 'mongoose';
import User from '@/models/User'
import Blogpost from '@/models/Blogpost'
import clientPromise from '@/app/context/mongodb';
import mongoRoute from '@/app/context/mongoroute';
import { getServerSession } from 'next-auth'

import { options } from '../auth/[...nextauth]/options';


export async function GET(request: NextRequest, response: NextResponse) {

    
    // const client = await clientPromise
    // const db = client.db('test') 

    const client = await mongoRoute()


    const blogs = await Blogpost.find().populate({ path: 'user', model: User, select: '-password'}).sort({createdAt: -1}).exec()


    //const blogs = await db.collection('blogposts').find({}).map(blog => ({...blog})).limit(10).toArray()
    // const blogs = await db.collection('blogposts').find().limit(10).toArray()

    // const blogs = await db.collection('blogposts').find().sort({createdAt:-1}).toArray()


    //const blogs = await Blogpost.find()
    
    console.log(blogs)

    

    return  NextResponse.json( blogs )

    // const users = await db.collection('users').find().toArray()

    // const users = getUsers()

    // return NextResponse.json(users)

 
 
}

export async function PATCH(request: NextRequest, res: NextResponse) {

    const client = await mongoRoute()

    const data = await request.json()

    const { title, content, _id } = data

    if (title === '' || content === '') {
        return NextResponse.json('you cant have a blank title or content')


    }

    const post = await Blogpost.findById(_id).exec()

    
    if(!post) return NextResponse.json('error with bullshit this is all bullshit')


    // const reqData = {
    //     title,
    //     content
    // }

    // const updatedPost = await Blogpost.updateOne({_id, reqData })

    post.title = title
    post.content = content

     const savedPost = await post.save()

    if(savedPost) {
        return NextResponse.json('post was updated')
    } else {
        return NextResponse.json('didnt save')
    }
    

    
}


export async function POST(request: NextRequest, res: NextResponse) {

    const session = await getServerSession(options)
    console.log(session)

    if (session == null) {
        return NextResponse.json('you have to log in dude')
    }
    

    const client = await mongoRoute()

    const data = await request.json()

    const {title, content } = data

    if (!title || !content || title === '') {
        return NextResponse.json('hey there no name')


     }

    const newData = {
        title,
        content,
        user: session.user.id
    }


    try {
        await Blogpost.create(newData)
        console.log('you did it')
        return NextResponse.json('passed')
    } catch (error) {
        console.log(error, 'error with send data')
    }


}


export async function DELETE(request: NextRequest) {

    const client = await mongoRoute()

    const data = await request.json()

    const {_id} = data

    if (!_id) return NextResponse.json('no id')

    try {
        
        const deletedPost = await Blogpost.findOneAndDelete(_id).exec()
        
        return NextResponse.json('post is deleted')
    } catch (error) {
        return NextResponse.json('post was not deleted')
    }
}