'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import ViewNoteTipTap from './ViewNoteTipTap'

export default async function SingleNotes({noteId, userId, noteJson, isLiked, isSaved} : {
    noteId: string
    userId: string
    noteJson: any
    isLiked: boolean
    isSaved: boolean
}) {

    const [ isPostLiked, setIsPostLiked ] = useState(isLiked)
    const [ isNoteSaved, setIsNoteSaved ] = useState(isSaved)

    // const wasNoteSaved =  await fetch(`http://localhost:3000/api/signlenote/saves/${noteId}`, {cache: 'no-cache'})

    // const isSaved = await wasNoteSaved.json()

    // console.log(isSaved)
    

    
    
    // const notes = await fetch(`http://localhost:3000/api/singlenote/${noteId}`, { cache: 'no-cache'})
    
    // const noteJson = await notes.json()
    
    const { content: text, header: title, saved, likes, createdAt, updatedAt, isPrivate, user, id: notesId, liked_by} = noteJson
    
    //console.log(noteJson)
    
    
    let editButton = null
    
    if(userId === user) {
        editButton = (
            // <Link href={`/notes/${_id}`} className='outline p-2 mt-5 rounded-md hover:bg-gray-300 '>View</Link>
            <Link className='outline p-2 rounded-md hover:bg-gray-300' href={`/notes/${noteId}/edit`}> Edit </Link>
            )
        }
        
        // const isLiked = liked_by.includes(userId) 
        //   const isLiked = true
        // console.log(isLiked)

        
        

     async function handleLiked()  {
        
        await fetch(`http://localhost:3000/api/singlenote/likes/${noteId}`, {
            method: 'PATCH'
           
        })

       if (userId === user) {

        setIsPostLiked(false)

       } else {

           setIsPostLiked(!isPostLiked)
       }

    }


    async function handleSave() {

        await fetch(`http://localhost:3000/api/singlenote/saves/${noteId}`, {
            method: 'PATCH'
        })

        if (userId === user) {

            setIsNoteSaved(false)
    
           } else {
    
               setIsNoteSaved(!isNoteSaved)
               
           }

    }


    
    

  return (
    <div className='p-4 bg-slate-400 rounded-md'>
       
        

        <div className='flex justify-evenly'>

            {isLiked ? (<p>post is liked</p>) : (<p>post is not liked</p>)}


            <p>Likes: {likes}</p>
            <p>Saved: {saved}</p>
            
        </div>

        <div>
            <ViewNoteTipTap text={text} title={title} isPrivate={isPrivate} editButton={editButton} createdAt={createdAt} updatedAt={updatedAt} handleLike={handleLiked} isLiked={isLiked} handleSave={handleSave} isPostLiked={isPostLiked} isNoteSaved={isNoteSaved}   />
        </div>
    </div>
  )
}
