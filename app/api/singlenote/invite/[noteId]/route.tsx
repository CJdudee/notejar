import { options } from "@/app/api/auth/[...nextauth]/options"
import mongoRoute from "@/app/context/mongoroute"
import Note from "@/models/Note"
import User from "@/models/User"
import PendingInvite from '@/models/PendingInvite'
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

   //console.log(note)

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

    if(session?.user.id == foundUser._id) {
        return NextResponse.json('you cannot invite yourself')
    }

    const creatingInvite = await PendingInvite.create({userId: note.user, noteId, newEditorId: foundUser._id})
    
    // console.log(foundUser)
    // // note.allowedEditor += foundUser._id
    note.pendingEditor.push( foundUser._id )

     const addedUser = await note.save()

    if(creatingInvite && addedUser) {
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


export async function DELETE(request: NextRequest, res: NextResponse) {
    

    const session = await getServerSession(options)
    //console.log(session)

    if (session == null) {
        return NextResponse.json('you have to log in dude')
    }
    

    const client = await mongoRoute()

    const data = await request.json()

    const { deletePendingEditor } = data

    

    const noteId = request.url.slice(request.url.lastIndexOf('/') + 1 )
    // const note = await Note.findById(noteId).exec()

    console.log(deletePendingEditor)

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

    const foundUser = await User.findById(deletePendingEditor).exec()

    if(!foundUser) {
        //console.log(foundUser)
        return NextResponse.json('no user was found with that name')

    }
    
    await note.pendingEditor.pull(deletePendingEditor)

    const deleteInvite = await PendingInvite.findOneAndDelete({userId: note.user, noteId, newEditorId: deletePendingEditor}).exec()


    const removedPending = await note.save()
    
    // console.log(foundUser)
    // // note.allowedEditor += foundUser._id
    

     //console.log(deleteInvite)

    if(deleteInvite ) {
        return NextResponse.json("Editor was deleted")
    } else {
        return NextResponse.json('error with deleteing editor')
    }
}