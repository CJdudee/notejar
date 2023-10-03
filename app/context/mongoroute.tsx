import mongoose from 'mongoose';
import React from 'react'

export default async function mongoRoute() {
    const MONGODB_URI = `${process.env.MONGO_URI}`

    let client;

    try {
        client = await  mongoose.connect(MONGODB_URI)
        //console.log('yayy')
    } catch (e) {
        console.log(e, 'there was an error with the databasee')
    }

    return client
}
