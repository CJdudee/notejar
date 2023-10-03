import mongoRoute from "@/app/context/mongoroute"
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from 'next/server';

import Note from "@/models/Note";
import { options } from "@/app/api/auth/[...nextauth]/options";




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