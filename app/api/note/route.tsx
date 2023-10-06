import { NextRequest, NextResponse } from 'next/server';
import React from 'react'
import mongoose from 'mongoose';
import User from '@/models/User'
import Note from '@/models/Note'
import Blogpost from '@/models/Blogpost'
import clientPromise from '@/app/context/mongodb';
import mongoRoute from '@/app/context/mongoroute';
import { getServerSession } from 'next-auth'

import { options } from '../auth/[...nextauth]/options';


export async function GET(request: NextRequest, response: NextResponse) {

   

    //console.log(session)

    
    // const client = await clientPromise
    // const db = client.db('test') 

    const client = await mongoRoute()


    const notes = await Note.find({ isPrivate: false}).select('header content createdAt updatedAt _id').populate({ path: 'user', model: User, select: 'username _id profileColor'}).sort({createdAt: -1}).exec()


    if(!notes) {
        return NextResponse.json("be the first to post")
    }


    //const notes = await db.collection('blogposts').find({}).map(blog => ({...blog})).limit(10).toArray()
    // const notes = await db.collection('blogposts').find().limit(10).toArray()

    // const notes = await db.collection('blogposts').find().sort({createdAt:-1}).toArray()


    //const notes = await Blogpost.find()
    
    //console.log(notes)

    

    return  NextResponse.json( notes )

    // const users = await db.collection('users').find().toArray()

    // const users = getUsers()

    // return NextResponse.json(users)

 
 
}

export async function PATCH(request: NextRequest, res: NextResponse) {

    const client = await mongoRoute()

    const data = await request.json()

    const { header, content,isPrivate, id } = data

    console.log(id)

    if (header === '' || content === '') {
        return NextResponse.json('you cant have a blank title or content')


    }

    const notes = await Note.findById(id).exec()

    
    if(!notes) return NextResponse.json('error with bullshit this is all bullshit')


    // const reqData = {
    //     title,
    //     content
    // }

    // const updatednotes = await Blognotes.updateOne({_id, reqData })

    notes.header = header
    notes.content = content
    notes.isPrivate = isPrivate

     const savedPost = await notes.save()

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

    const {header, content, isPrivate } = data

    if (!header || !content || header === '') {
        return NextResponse.json('hey there no name')


     }

    const newData = {
        header,
        content,
        isPrivate,
        user: session.user.id
    }

    //const userId = User.findById(session.user.id)


    try {
        await Note.create(newData)
        console.log(newData)
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
        
        const deletedPost = await Note.findOneAndDelete(_id).exec()
        
        return NextResponse.json('post is deleted')
    } catch (error) {
        return NextResponse.json('post was not deleted')
    }
}