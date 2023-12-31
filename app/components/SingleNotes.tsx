'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import ViewNoteTipTap from './tiptapEditors/ViewNoteTipTap'
import { date_format, time_format } from '@/utils/helpers'


export default function SingleNotes({noteId, userId, noteJson, isLiked, isSaved} : {
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

    const madeAt = date_format(createdAt)
    const editedAt = date_format(updatedAt)

    const madeTime = time_format(createdAt)
    const editedTime = time_format(updatedAt)

    //allowing edit button for the author of the note

    let editButton = null
    
    if(userId == user || allowedEditor.map((u: any) => {return u._id}) == userId) {
        editButton = (
            <Link className='outline p-2 rounded-md hover:bg-gray-300' href={`/notes/${noteId}/edit`}> Edit </Link>
            )
        }
        
        //handler

    async function handleLiked()  {
        await fetch(`http://${process.env.NEXT_URL}/api/singlenote/likes/${noteId}`, {
            method: 'PATCH'
        })

       if (userId === user) {
        setIsPostLiked(false)
       } else {
        setIsPostLiked(!isPostLiked)
       }
    }


    async function handleSave() {
        await fetch(`http://${process.env.NEXT_URL}/api/singlenote/saves/${noteId}`, {
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

            <div className='p-4 bg-gray-300 rounded-md  '>
            
                <div className='flex justify-evenly font-semibold mb-4'>
                    <p>Likes: {likes}</p>
                    <p>Saved: {saved}</p>
                </div>

                <div className='max-h-full'>
                    <ViewNoteTipTap text={text} title={title} 
                    isPrivate={isPrivate} editButton={editButton} 
                    createdAt={madeAt} updatedAt={editedAt} 
                    handleLike={handleLiked} isLiked={isLiked} 
                    handleSave={handleSave} isPostLiked={isPostLiked} 
                    isNoteSaved={isNoteSaved} madeTime={madeTime} 
                    editedTime={editedTime}  />
                </div>
                
            </div>

        </div>

    </div>
  )
}
