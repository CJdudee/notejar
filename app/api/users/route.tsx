import mongoRoute from "@/app/context/mongoroute"
import User from "@/models/User";
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt'
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

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


export async function PATCH(request: NextRequest, res: NextResponse) {

    const session = await getServerSession(options)
    

    const client = await mongoRoute()

    const data = await request.json()

    console.log(data)

    const {username, oldPwd, newPwd } = data

    if (!username || !oldPwd && !newPwd ) {
        return NextResponse.json('hey there no name')


     }

     const users = await User.findById(session.user.id).select('password').exec()
     
     console.log(users)

     if(!users) {
        return NextResponse.json('no user was found')
     }

     if(oldPwd && newPwd) {

        const rightPwd = bcrypt.compare(users.password, oldPwd)

        if(!rightPwd) {
            return NextResponse.json('wrong Pwd')
        }

        const hashedPwd = await bcrypt.hash(newPwd, 10)

        users.password = hashedPwd

     }

     users.username = username

     const userUpdated =  users.save()


    //  const hashedPwd = await bcrypt.hash(password, 10)





    if (userUpdated) {
        return NextResponse.json('user was updated')
    } else {
        return NextResponse.json('problem with user update')
    }




}
