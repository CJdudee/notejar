import mongoRoute from "@/app/context/mongoroute"
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from 'next/server';
import { options } from "../../auth/[...nextauth]/options";

export async function GET(request: NextRequest, res: NextResponse) {
    const session = await getServerSession(options)

    const client = await mongoRoute()

    //console.log(session)


    const userId = request.url.slice(request.url.lastIndexOf('/') + 1 )

    //const userId =  request.nextUrl.searchParams.get('')


    //const something = request.nextUrl.searchParams.get('queryParam')

    // make it so that you compare the session to the get request that was sent

    
    

    // if (session == null) {
    //     return NextResponse.json('you have to log in dude')
    // }

    //console.log(userId)

    //return NextResponse.json('heyyl')


    
    
    const user = await User.findById(userId).select('-password').exec()

    

     if (!user) return NextResponse.json(user)

    return NextResponse.json(user)


}


