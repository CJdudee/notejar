'use client'
// we have to fetch this inside of the edit notes page and then we can send this data down as props to use in a useState and be able to handle edits and more 
import React, { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import EditNoteTipTap from './EditNoteTipTap'
import InvDialog from './InvDialog'

export default function EditNotes({ content, header, isPrivate: noteIsPrivate, noteId, user, sessionUser, allowedEditor, pendingEditor } : {
    content: string,
    header: string, 
    isPrivate: boolean,
    noteId: any,
    user: any,
    sessionUser: string,
    allowedEditor: any
    pendingEditor: Array<object>
}) {

  const searchParams = useSearchParams() 
  const dialogRef = useRef<null | HTMLDialogElement>(null)
  const [ inviteModal, setInviteModal ] = useState(false)

  useEffect( () => {
    if (inviteModal === true) {
      console.log('modal has open')
      //dialogRef.current?.show()
      dialogRef.current?.showModal()
    } else {
      console.log('modal has closed')
      dialogRef.current?.close()
    }
  }, [inviteModal])

  useEffect(() => {
    if (inviteModal === true) {

      const handler = (e) => {
        if(!dialogRef || !dialogRef.current.contains(e.target)) {
          setInviteModal(false)
        }
      }
  
      document.addEventListener('mousedown', handler)
  
      return () => {
        document.removeEventListener('mousedown', handler)
      }

    }
    
  }, [inviteModal])

  const router = useRouter()

  const closeDialog = () => {
    setInviteModal(false)
  }

  async function handleInvite() {

    await fetch(`http://localhost:3000/api/singlenote/invite/${noteId}`, {
      method: 'POST',
      body: JSON.stringify( { newEditorName: newEditorName } ),
      headers: {
        "Content-Type": "application/json"
      }
  })

  setNewEditorName('')
  window.location.reload()
  }

  async function removePendingInvite(userId: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/singlenote/invite/${noteId}`, {
        method: 'DELETE',
        body: JSON.stringify({ deletePendingEditor: userId}),
        headers: {
          "Content-Type": "application/json"
        },
      })

      if(!response.ok) {
        throw new Error('problem with removing invite')
      }
    } catch (error) {
      console.log(error)
    }
    window.location.reload()
    }

    async function removeEditor(userId: string) {
      try {
        const response = await fetch(`http://localhost:3000/api/singlenote/invite/${noteId}`, {
        method: 'PATCH',
        body: JSON.stringify({ deleteEditorId: userId}),
        headers: {
          "Content-Type": "application/json"
        },
      })
      if(!response.ok) {
        throw new Error('problem with delete')
      }
      } catch (error) {
        console.log('problem with delete')
      }
      window.location.reload()
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

    //console.log(allowedEditor)
    const [title, setTitle ] = useState(header)
    const [text, setText ] = useState(content)
    const [isPrivate, setIsPrivate ] = useState<boolean>(noteIsPrivate)
    const [newEditorName, setNewEditorName ] = useState('')

    //console.log(pendingEditor)

    const dialog: JSX.Element | null = inviteModal ? 
    (
      <InvDialog pendingEditor={pendingEditor} allowedEditor={allowedEditor}
      removePendingInvite={removePendingInvite} removeEditor={removeEditor} 
      dialogRef={dialogRef} newEditorName={newEditorName} 
      setNewEditorName={setNewEditorName} closeDialog={closeDialog}
      handleInvite={handleInvite} />
    ) : 
      null


  return (
    <div className='p-4'>
      <p className='text-center text-white'>EDIT NOTE</p>
      <form className='bg-slate-200  rounded-md max-w-4xl mx-auto  ' onSubmit={handleSubmit}>

        {dialog}

        <div className='bg-slate-200  rounded-md outline '>
          <EditNoteTipTap setText={setText} text={text} 
          setTitle={setTitle} title={title} 
          isPrivate={isPrivate} setIsPrivate={setIsPrivate} 
          sessionUser={sessionUser} user={user} 
          handleDelete={handleDelete} newEditorName={newEditorName} 
          setNewEditorName={setNewEditorName} inviteModal={inviteModal} 
          setInviteModal={setInviteModal} />
        </div>

      </form>
    </div>
  )
}


