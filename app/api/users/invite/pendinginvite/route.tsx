import { options } from "@/app/api/auth/[...nextauth]/options"
import mongoRoute from "@/app/context/mongoroute"
import PendingInvite from "@/models/PendingInvite"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, response: NextResponse) {

   

    //console.log(session)
    const session = await getServerSession(options)
    
    // const client = await clientPromise   

    if(!session) {
        return NextResponse.json('you have to log in dude')
    }
    // const db = client.db('test') 

    const client = await mongoRoute()


    const pendingInvites = await PendingInvite.find({ newEditorId: session.user.id}).populate({path: 'noteId', model: 'Note'}).populate({path: 'userId', model: 'User'}).exec()
    


    // .select('header content createdAt updatedAt _id').populate({ path: 'user', model: User, select: 'username _id profileColor'}).sort({createdAt: -1}).exec


    if(!pendingInvites) {
        return NextResponse.json("be the first to post")
    }


    //const notes = await db.collection('blogposts').find({}).map(blog => ({...blog})).limit(10).toArray()
    // const notes = await db.collection('blogposts').find().limit(10).toArray()

    // const notes = await db.collection('blogposts').find().sort({createdAt:-1}).toArray()


    //const notes = await Blogpost.find()
    
    //console.log(notes)

    

    return  NextResponse.json( pendingInvites )

    // const users = await db.collection('users').find().toArray()

    // const users = getUsers()

    // return NextResponse.json(users)

 
 
}