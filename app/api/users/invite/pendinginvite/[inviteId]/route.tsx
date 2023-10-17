import { options } from "@/app/api/auth/[...nextauth]/options"
import mongoRoute from "@/app/context/mongoroute"
import Note from "@/models/Note"
import PendingInvite from "@/models/PendingInvite"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"



export async function PATCH(request: NextRequest, res: NextResponse) {

    const session = await getServerSession(options)
    //console.log(session)

    if (session == null) {
        return NextResponse.json('you have to log in dude')
    }
    

    const client = await mongoRoute()

    //const data = await request.json()

    //const { deleteEditorId } = data

    

    const inviteId = request.url.slice(request.url.lastIndexOf('/') + 1 )
    // const note = await Note.findById(noteId).exec()

    //console.log(deleteEditorId)

    if (!inviteId) {
        return NextResponse.json('hey no note was found')


     }

    //  try {
    //     var note = await Note.findById(noteId).exec()
    //  } catch (error) {
    //     console.log(error)
    //  }

    const invite = await PendingInvite.findById(inviteId).exec()

   //console.log(note)

    if(!invite) {
        return NextResponse.json('no note was found')
    }

    //const userId = User.findById(session.user.id)


    // if(note.user != session?.user.id) {
    //     //console.log(note)
    //     return NextResponse.json('you can invite unless you was the author of the note')
    // }

    const note = await Note.findById(invite.noteId).select('allowedEditor').exec()

    if(!note){
        return NextResponse.json('no note was found')
    }


    //console.log(foundUser)
    // note.allowedEditor += foundUser._id
    if(note.allowedEditor.includes(invite.newEditorId)) {
        return NextResponse.json('user is already in the note')
    } 

    await note.pendingEditor.pull(invite.newEditorId)

    await note.allowedEditor.push(invite.newEditorId)

    const accepted = await note.save()

    const deletePending = await PendingInvite.deleteOne({_id: inviteId})

    if(accepted && deletePending ) {
        return NextResponse.json("Editor was added")
    } else {
        return NextResponse.json('error with adding editor')
    }


}


export async function DELETE(request: NextRequest, res: NextResponse) {

    const session = await getServerSession(options)
    //console.log(session)

    if (session == null) {
        return NextResponse.json('you have to log in dude')
    }
    

    const client = await mongoRoute()

    //const data = await request.json()

    //const { deleteEditorId } = data

    

    const inviteId = request.url.slice(request.url.lastIndexOf('/') + 1 )
    // const note = await Note.findById(noteId).exec()

    //console.log(deleteEditorId)

    if (!inviteId) {
        return NextResponse.json('hey no note was found')


     }

    //  try {
    //     var note = await Note.findById(noteId).exec()
    //  } catch (error) {
    //     console.log(error)
    //  }

    const deleteInvite = await PendingInvite.findByIdAndDelete(inviteId).exec()

   //console.log(note)

    if(!deleteInvite) {
        return NextResponse.json('no note was found')
    }

    //const userId = User.findById(session.user.id)


    // if(note.user != session?.user.id) {
    //     //console.log(note)
    //     return NextResponse.json('you can invite unless you was the author of the note')
    // }

    return NextResponse.json('Pending Invite Was Delete')

}