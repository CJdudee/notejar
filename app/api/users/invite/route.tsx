import { getServerSession } from "next-auth"
import { options } from "../../auth/[...nextauth]/options"
import mongoRoute from "@/app/context/mongoroute"
import { NextRequest, NextResponse } from "next/server"
import Note from "@/models/Note"

//http://localhost:3000/users/invite

export async function GET(request: NextRequest, res: NextResponse) {
    const session = await getServerSession(options)

    const client = await mongoRoute()

    //console.log(session)


    //const userId = request.url.slice(request.url.lastIndexOf('/') + 1 )

    //const userId =  request.nextUrl.searchParams.get('')


    //const something = request.nextUrl.searchParams.get('queryParam')

    // make it so that you compare the session to the get request that was sent

    
    

    if (session == null) {
        return NextResponse.json('you have to log in dude')
    }

    //console.log(userId)

    //return NextResponse.json('heyyl')


    
    
    // const userSaved = await Usersaved.find({ userId }).populate('noteId', 'header  likes user createdAt updatedAt').exec()

    const invitedTo = await Note.find({ allowedEditor: session?.user.id }).populate({ path: 'user'}).exec()
    // const invitedTo = await Note.find({ allowedEditor: session?.user.id }).populate({ path: 'noteId', select: 'header likes user createdAt updatedAt', populate: [
    //     { path: 'user', select: '-password -roles'}
    // ]}).exec()

    

     if (!invitedTo) return NextResponse.json('no notes found')

    return NextResponse.json(invitedTo)


}