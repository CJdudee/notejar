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

   


    const userid = request.url.slice(request.url.lastIndexOf('/') + 1 )


    //console.log(request.body)

    //const userId =  request.nextUrl.searchParams.get('')

    // console.log( userid)
    // console.log(session.user.id)

    // const { user } = session

    // const { id } = user


    if ( session?.user.id != userid ) {

        const note = await Note.find({user: userid, isPrivate: false}).select('-content -saved -user  -liked_by -isPrivate').sort({createdAt:-1}).exec()

        if(!note) return NextResponse.json('no note foujnd')

        

        return NextResponse.json(note)
    }


    //const something = request.nextUrl.searchParams.get('queryParam')

    // make it so that you compare the session to the get request that was sent

    
    // if ( session == null) {
    //     return NextResponse.json('error with getting profile')
    // }

   

    

    

    //const note = await Note.find({user: id}).select('_id header').exec()

    const note = await Note.find({user: userid}).sort({createdAt:-1}).exec()

    
    if(!note) return NextResponse.json('no note foujnd')

     //if (!note) return NextResponse.json('no note found')

    return NextResponse.json(note)


}


