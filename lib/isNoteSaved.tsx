'use client'

import React from 'react'

export default async function isNoteSaved(noteId) {
 
    const saved =  await fetch(`http://localhost:3000/api/signlenote/saves/${noteId}`, {cache: 'no-cache'})

    const isSaved = await saved.json()

    return isSaved

}
