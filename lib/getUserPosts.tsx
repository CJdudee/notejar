import React from 'react'

export default async function getUserPosts(id: string) {
  
    const notes = await fetch(`${process.env.NEXT_URL}/api/note/${id}`, { cache: 'no-cache'})

    const noteJson = await notes.json()

    return noteJson
}
