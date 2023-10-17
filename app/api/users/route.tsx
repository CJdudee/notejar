import mongoRoute from "@/app/context/mongoroute"
import User from "@/models/User";
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt'
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import Note from "@/models/Note";
import Usersaved from "@/models/Usersaved";

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

    const {username, oldPwd, newPwd, profileColor } = data

    if (!username  ) {
        return NextResponse.json('hey there no name')


     }

     //const users = await User.findById(session.user.id).select('password').exec()
     const users = await User.findById(session.user.id).exec()
     
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

     if(profileColor) {
        users.profileColor = profileColor
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


export async function DELETE(request: NextRequest, res: NextResponse) {


    const session = await getServerSession(options)
    

    const client = await mongoRoute()

    if (!session) {
        return NextResponse.json('you have to have a user to delete')
    }

    try {
        var deletedUser = await User.findByIdAndDelete(session.user.id)

        var deletedNotes = await Note.DeleteMany({user: session.user.id})

        var deletedUserSaved = await Usersaved.DeleteMany({userId: session.user.id})
    } catch (error) {
        console.log(error) 
        return NextResponse.json('error with deleting')
    }

    if (deletedUser &&  deletedNotes && deletedUserSaved) {
        return NextResponse.json('user was deleted')
    } else {
        return NextResponse.json('error with delete')
    }
}