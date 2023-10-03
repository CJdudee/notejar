import { MongoClient, MongoClientOptions  } from "mongodb";

if (!process.env.MONGO_URI) {
    throw new Error('missing env variable: mongo_uri')
}

const uri = process.env.MONGO_URI
const options: MongoClientOptions = {}

let client 
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {

    // this is for typescript to make sure there isn't errors
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options)
        globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
} else {

    client = new MongoClient(uri, options) 
    clientPromise = client.connect()
}


export default clientPromise


// export async function POST(request: NextRequest, res: NextResponse) {
//     const MONGODB_URI = `${process.env.MONGO_URI}`

//     let client;

//     try {
//         client = await  mongoose.connect(MONGODB_URI)
//         console.log('yayy')
//     } catch (e) {
//         console.log(e, 'there was an error with the databasee')
//     }

//     const data = await request.json()

//     const {username, password } = data

//     if (!username || !password) {
//         return NextResponse.json('hey there no name')


//      }

//     const newData = {
//         username,
//         password
//     }


//     try {
//         await User.create(newData)
//         console.log('you did it')
//         return NextResponse.json('passed')
//     } catch (error) {
//         console.log(error, 'error with send data')
//     }


// }