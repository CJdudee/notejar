import { NextRequest, NextResponse } from 'next/server';
import React from 'react'

import User from '@/models/User'
import clientPromise from '@/app/context/mongodb';
import mongoRoute from '@/app/context/mongoroute';
import bcrypt from 'bcrypt'


export async function GET(request: NextRequest, response: NextResponse) {

    const client =  clientPromise
    const db = (await client).db('test') 

    const users = await db.collection('users').find().toArray()

    return NextResponse.json(users)

 
 
}


export async function POST(request: NextRequest, res: NextResponse) {
    

    const client = await mongoRoute()

    const data = await request.json()

    const {username, password } = data

    if (!username || !password) {
        return NextResponse.json('hey there no name')


     }


     const hashedPwd = await bcrypt.hash(password, 10)



    const newData = {
        username,
        password: hashedPwd
    }


    try {
        await User.create(newData)
        console.log('you did it')
        return NextResponse.json('passed')
    } catch (error) {
        console.log(error, 'error with send data')
    }


}