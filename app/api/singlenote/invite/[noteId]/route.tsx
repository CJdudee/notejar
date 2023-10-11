import { options } from "@/app/api/auth/[...nextauth]/options"
import mongoRoute from "@/app/context/mongoroute"
import Note from "@/models/Note"
import User from "@/models/User"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, res: NextResponse) {

    const session = await getServerSession(options)
    //console.log(session)

    if (session == null) {
        return NextResponse.json('you have to log in dude')
    }
    

    const client = await mongoRoute()

    const data = await request.json()

    const { newEditorName } = data

    

    const noteId = request.url.slice(request.url.lastIndexOf('/') + 1 )
    // const note = await Note.findById(noteId).exec()

    console.log(newEditorName)

    if (!noteId) {
        return NextResponse.json('hey no note was found')


     }

    //  try {
    //     var note = await Note.findById(noteId).exec()
    //  } catch (error) {
    //     console.log(error)
    //  }

    const note = await Note.findById(noteId).exec()

   console.log(note)

    if(!note) {
        return NextResponse.json('no note was found')
    }

    //const userId = User.findById(session.user.id)


    if(note.user != session?.user.id) {
        //console.log(note)
        return NextResponse.json('you can invite unless you was the author of the note')
    }

    const foundUser = await User.findOne({username: newEditorName}).exec()

    if(!foundUser) {
        //console.log(foundUser)
        return NextResponse.json('no user was found with that name')

    }
    console.log(foundUser)
    // note.allowedEditor += foundUser._id
     note.allowedEditor.push(foundUser._id)

    const addedUser = await note.save()

    if(addedUser) {
        return NextResponse.json("Editor was added")
    } else {
        return NextResponse.json('error with adding editor')
    }


}

//http://localhost:3000/signlenote/invite/{noteId}

//PATCH

export async function PATCH(request: NextRequest, res: NextResponse) {

    const session = await getServerSession(options)
    //console.log(session)

    if (session == null) {
        return NextResponse.json('you have to log in dude')
    }
    

    const client = await mongoRoute()

    const data = await request.json()

    const { deleteEditorId } = data

    

    const noteId = request.url.slice(request.url.lastIndexOf('/') + 1 )
    // const note = await Note.findById(noteId).exec()

    console.log(deleteEditorId)

    if (!noteId) {
        return NextResponse.json('hey no note was found')


     }

    //  try {
    //     var note = await Note.findById(noteId).exec()
    //  } catch (error) {
    //     console.log(error)
    //  }

    const note = await Note.findById(noteId).exec()

   //console.log(note)

    if(!note) {
        return NextResponse.json('no note was found')
    }

    //const userId = User.findById(session.user.id)


    if(note.user != session?.user.id) {
        //console.log(note)
        return NextResponse.json('you can invite unless you was the author of the note')
    }

    // const foundUser = await User.findOne({username: newEditorName}).exec()

    // if(!foundUser) {
    //     //console.log(foundUser)
    //     return NextResponse.json('no user was found with that name')

    // }


    //console.log(foundUser)
    // note.allowedEditor += foundUser._id
    await note.allowedEditor.pull(deleteEditorId)

    const addedUser = await note.save()

    if(addedUser ) {
        return NextResponse.json("Editor was added")
    } else {
        return NextResponse.json('error with adding editor')
    }


}