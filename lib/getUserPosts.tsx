import React from 'react'

export default async function getUserPosts(id: string) {
  
    const notes = await fetch(`http://localhost:3000/api/note/${id}`, { cache: 'no-cache'})

    const noteJson = await notes.json()

    return noteJson
}
