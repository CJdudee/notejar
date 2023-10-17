'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import ViewNoteTipTap from './ViewNoteTipTap'

// const isLiked = liked_by.includes(userId) 
        //   const isLiked = true
        // console.log(isLiked)


// const wasNoteSaved =  await fetch(`http://localhost:3000/api/signlenote/saves/${noteId}`, {cache: 'no-cache'})

// const isSaved = await wasNoteSaved.json()

export default async function SingleNotes({noteId, userId, noteJson, isLiked, isSaved} : {
    noteId: string
    userId: string
    noteJson: any
    isLiked: boolean
    isSaved: boolean
}) {

    const [ isPostLiked, setIsPostLiked ] = useState(isLiked)
    const [ isNoteSaved, setIsNoteSaved ] = useState(isSaved)

    //destructer

    const { content: text, header: title, saved, likes, createdAt, updatedAt, isPrivate, user, id: notesId, liked_by, allowedEditor} = noteJson


    //making user friendly date

    const madeAt = new Date(createdAt).toLocaleDateString('en-us', {weekday: "short", year: 'numeric', month: 'short', day: 'numeric'} )
    const editedAt = new Date(updatedAt).toLocaleDateString('en-us', {weekday: "short", year: 'numeric', month: 'short', day: 'numeric'} )

    const madeTime = new Date(createdAt).toLocaleTimeString('en-US')
    const editedTime = new Date(updatedAt).toLocaleTimeString('en-US')

    

    //allowing edit button for the author of the note

    //const allowed = allowedEditor.includes(userId)

    let editButton = null
    
    if(userId == user || allowedEditor.map((u: any) => {return u._id}) == userId) {
        editButton = (
            // <Link href={`/notes/${_id}`} className='outline p-2 mt-5 rounded-md hover:bg-gray-300 '>View</Link>
            <Link className='outline p-2 rounded-md hover:bg-gray-300' href={`/notes/${noteId}/edit`}> Edit </Link>
            )
        }
        
        
        //handler

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
    <div className='p-4'>

   

    <div className=' max-w-4xl mx-auto'>

    

    <div className='p-4 bg-blue-200 rounded-md  '>
       
        

        <div className='flex justify-evenly font-semibold mb-4'>

            {/* {isLiked ? (<p>post is liked</p>) : (<p>post is not liked</p>)} */}


            <p>Likes: {likes}</p>
            <p>Saved: {saved}</p>
            
        </div>

        <div className='max-h-full'>
            <ViewNoteTipTap text={text} title={title} isPrivate={isPrivate} editButton={editButton} createdAt={madeAt} updatedAt={editedAt} handleLike={handleLiked} isLiked={isLiked} handleSave={handleSave} isPostLiked={isPostLiked} isNoteSaved={isNoteSaved} madeTime={madeTime} editedTime={editedTime}   />
        </div>
        
    </div>

    </div>

    </div>
  )
}
