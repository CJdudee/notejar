import mongoRoute from "@/app/context/mongoroute"
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from 'next/server';
import Usersaved from '@/models/Usersaved'

import Note from "@/models/Note";
import { options } from "@/app/api/auth/[...nextauth]/options";




//@route PATCH api/singlenote/saves/:id
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

    let saved 

    

    

    if ( session?.user.id == note.user ) {

        

        

        return NextResponse.json('Can not save your own notes')
    }


    const foundSave = await Usersaved.findOne({ userId: session?.user.id, noteId })
    

    if(foundSave) {

        // note.liked_by.push(session?.user.id)

        // note.likes += 1

        // liked = await note.save()

        await Usersaved.deleteOne({ userId: session?.user.id, noteId })
        note.saved -= 1

        saved = await note.save()

        
       
        return NextResponse.json('post unsaved')
        

    } else {
        
        
        saved = await Usersaved.create({userId: session?.user.id, noteId})
        
                note.saved += 1
        
                saved = await note.save()

        
        

    }



    if(saved) {
        return NextResponse.json('post was updated')
    } else {
        return NextResponse.json('post was not updated')
    }


}




//@route GET api/singlenote/saves/:id
//@desc GET request to see if a user has saved the post before for the frontend to use the right data
//@access Private

export async function GET(req: NextRequest, res: NextResponse) {


    const session = await getServerSession(options)
    
    
    const client = await mongoRoute()

    console.log(session)

   


    const noteId = req.url.slice(req.url.lastIndexOf('/') + 1 )


    if (!session) {
        return NextResponse.json(false)
    }

    const note = await Note.findById(noteId).exec()

    if(!note) {
        return NextResponse.json('no note was found here')
    }

    

    

    

    if ( session?.user.id == note.user ) {

        

        

        return NextResponse.json(false)
    }


    const foundSave = await Usersaved.findOne({ userId: session?.user.id, noteId })
    

    if(foundSave) {

        // note.liked_by.push(session?.user.id)

        // note.likes += 1

        // liked = await note.save()

        

        
       
        return NextResponse.json(foundSave)
        

    } else {


        return NextResponse.json(foundSave)

        
        

    }



    


}
