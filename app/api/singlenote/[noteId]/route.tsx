import mongoRoute from "@/app/context/mongoroute"
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from 'next/server';
import { options } from "../../auth/[...nextauth]/options";
import Note from "@/models/Note";

export async function GET(request: NextRequest, res: NextResponse) {
    const session = await getServerSession(options)

    const client = await mongoRoute()

    //console.log(session)

   


    let noteId = request.url.slice(request.url.lastIndexOf('/') + 1 )

    // if(noteId === 'edit') {
    //     const url = request.url.replace('/edit', '')

    //     console.log(url)

    //     noteId = url.slice(url.lastIndexOf('/') + 1 )
    // }


    //console.log(request.body)

    //const noteId =  request.nextUrl.searchParams.get('')

    // console.log( noteId)
    // console.log(session.user.id)

    // const { user } = session

    // const { id } = user

    const note = await Note.findById(noteId).populate({path: 'allowedEditor', model: User, select: '_id username profileColor'}).exec()

    //console.log(note)


    if ( session?.user.id != note.user ) {

        if(note.isPrivate === true) {
            return NextResponse.json('note is private')
        }

        

        return NextResponse.json(note)
    }
    //const something = request.nextUrl.searchParams.get('queryParam')

    // make it so that you compare the session to the get request that was sent

    
    // if ( session == null) {
    //     return NextResponse.json('error with getting profile')
    // }

    // if (session == null) {
    //     return NextResponse.json('you have to log in dude')
    // }

    //console.log(noteId)

    //return NextResponse.json('heyyl')


    

    //const note = await Note.find({user: id}).select('_id header').exec()

    

    

     //if (!note) return NextResponse.json('no note found')

    return NextResponse.json(note)


}


//@route PATCH api/note/like/:1d
//@desc liking a note , might have to make this its own api
//@access Private

export async function PATCH(req: NextRequest, res: NextResponse) {


    const session = await getServerSession(options)
    
    
    const client = await mongoRoute()

    //console.log(session)

   


    const noteId = req.url.slice(req.url.lastIndexOf('/') + 1 )


    if (!session) {
        return NextResponse.json('you have to login to leave a like')
    }

    const note = await Note.findById(noteId).exec()

    if(!note) {
        return NextResponse.json('no note was found here')
    }

    let liked 

    

    if ( session?.user.id == note.user ) {

        

        

        return NextResponse.json('Can not like your own notes')
    }

    

    if(session?.user.id != note.liked_by) {

        note.liked_by.push(session?.user.id)

        note.likes += 1

        liked = await note.save()

       

        

    } else {


        note.liked_by.pull(session?.user.id)

        note.likes -= 1

        liked = await note.save()

    }



    if(liked) {
        return NextResponse.json('post was updated')
    } else {
        return NextResponse.json('post was not liked')
    }


}

export async function DELETE(request: NextRequest) {

    const session = await getServerSession(options)

    const client = await mongoRoute()

    const noteId = request.url.slice(request.url.lastIndexOf('/') + 1 )

    //const data = await request.json()

   // const {_id} = data

    if(!session || !session.user.id || !noteId) {
        return NextResponse.json('no id was found')
    }

    //if (!_id) return NextResponse.json('no id')

    const note = await Note.findById(noteId).exec()
    // const note = await Note.findById(noteId).populate({ path: 'user'}).exec()

    console.log(note)

    if(note.user._id != session?.user.id) {
        return NextResponse.json('only the user can delete the post')
    }

    try {
        
        // const deletedPost = await Note.findOneAndDelete(noteId).exec()
        await Note.findOneAndDelete({_id: noteId}).exec()
        
        return NextResponse.json('post is deleted')
    } catch (error) {
        return NextResponse.json('post was not deleted')
    }
}