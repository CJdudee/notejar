'use client'
// we have to fetch this inside of the edit notes page and then we can send this data down as props to use in a useState and be able to handle edits and more 
//one way of doing this is making the edit page a use client page and then send the data down to here
//or we can leave it as a server comp but i really dont need to do that but we will see when we get there 
import React, { useState } from 'react'


import { useRouter } from 'next/navigation'
import NewNoteTipTap from './NewNoteTipTap'
import EditNoteTipTap from './EditNoteTipTap'

export default function EditNotes({content, header, isPrivate: noteIsPrivate, noteId, user, sessionUser} : {
    content: string,
    header: string, 
    isPrivate: boolean,
    noteId: string,
    user: any,
    sessionUser: string,
}) {

   



     

    const [title, setTitle ] = useState(header)
    const [text, setText ] = useState(content)
    const [isPrivate, setIsPrivate ] = useState<boolean>(noteIsPrivate)
    const [newEditorId, setNewEditorId ] = useState('')

    const [ inviteModal, setInviteModal ] = useState(false)
    //use this modal to pop up an input to put a user _id to be able to edit the note so i need to set this madal to true when invite Editor is clicked

     // console.log(header)
     // console.log(content)
     //console.log(editIsPrivate)


     const router = useRouter()

     async function handleInvite( noteId ) {
      await fetch(`http://localhost:3000/api/singlenote/invite/${noteId}`, {
        method: 'POST',
        body: JSON.stringify({ newEditorId }),
        headers: {
          "Content-Type": "application/json"
        }
      })
     }

     async function handleDelete() {


      try {
        const response = await fetch(`http://localhost:3000/api/singlenote/${noteId}`, {
        method: 'DELETE',
      })

      if(!response.ok) {
        throw new Error('problem with delete')
      }
        
      } catch (error) {
        console.log('problem with delete')
      }
      

      router.push('/profile')

     }

     async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      // const target = e.currentTarget

      // const title = target.elements.namedItem('title') as HTMLInputElement
      // const content = target.elements.namedItem('content') as HTMLInputElement

      const data = {
          header: title,
          content: text,
          isPrivate: isPrivate,
          id: noteId

      }

      try {
          const response = await fetch('/api/note', {
              method: "PATCH",
              body: JSON.stringify(data),
              headers: {
                  "Content-Type": "application/json"
              }
          })
          if (!response.ok) {
              throw new Error('error with post')
          }
      } catch (error) {
          console.log('problem with post')
      }

      router.push('/profile')

  }


  return (
    <div className=''>
      <p className='text-center text-white'>EDIT NOTE</p>
      <form className='bg-slate-200  rounded-md ' onSubmit={handleSubmit}>

       

        <div className='bg-slate-200  rounded-md outline'>
          <EditNoteTipTap setText={setText} text={text} setTitle={setTitle} title={title} isPrivate={isPrivate} setIsPrivate={setIsPrivate} sessionUser={sessionUser} user={user} handleDelete={handleDelete} newEditorId={newEditorId} setNewEditorId={setNewEditorId} />
        </div>


      </form>
    </div>
  )
}
