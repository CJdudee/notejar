import { options } from "@/app/api/auth/[...nextauth]/options"
import mongoRoute from "@/app/context/mongoroute"
import Note from "@/models/Note"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, res: NextResponse) {

    const session = await getServerSession(options)
    console.log(session)

    if (session == null) {
        return NextResponse.json('you have to log in dude')
    }
    

    const client = await mongoRoute()

    const data = await request.json()

    const {  newEditorId } = data

    const noteId = request.url.slice(request.url.lastIndexOf('/') + 1 )

    if (!noteId) {
        return NextResponse.json('hey no note was found')


     }

    const note = await Note.findById(noteId).exec()

    if(!note) {
        return NextResponse.json('no note was found')
    }

    //const userId = User.findById(session.user.id)


    if(note.user !== session.user.id) {
        return NextResponse.json('you can invite unless you was the author of the note')
    }

    note.allowedEditor += newEditorId

    const addedUser = await note.save()

    if(addedUser) {
        return NextResponse.json("Editor was added")
    } else {
        return NextResponse.json('error with adding editor')
    }


}