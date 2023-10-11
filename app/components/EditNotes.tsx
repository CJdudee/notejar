'use client'
// we have to fetch this inside of the edit notes page and then we can send this data down as props to use in a useState and be able to handle edits and more 
//one way of doing this is making the edit page a use client page and then send the data down to here
//or we can leave it as a server comp but i really dont need to do that but we will see when we get there 
import React, { useEffect, useRef, useState } from 'react'


import { useRouter, useSearchParams } from 'next/navigation'
import NewNoteTipTap from './NewNoteTipTap'
import EditNoteTipTap from './EditNoteTipTap'

export default function EditNotes({ content, header, isPrivate: noteIsPrivate, noteId, user, sessionUser, allowedEditor } : {
    content: string,
    header: string, 
    isPrivate: boolean,
    noteId: any,
    user: any,
    sessionUser: string,
    allowedEditor: any
}) {

   console.log(noteId)
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

  const closeDialog = () => {
    setInviteModal(false)
  }

  const router = useRouter()

    async function handleInvite(  ) {

      //console.log(noteId)

      await fetch(`http://localhost:3000/api/singlenote/invite/${noteId}`, {
        method: 'POST',
        body: JSON.stringify( { newEditorName: newEditorName } ),
        headers: {
          "Content-Type": "application/json"
        }
        ,  
      })

      setNewEditorName('')
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

  

  // useEffect(() => {

  //   const handler = (e) => {

  //     if (!menuRef || !menuRef.current.contains(e.target)) {
  //       setOpen(false)
  //     }

  //   }
    
  //   document.addEventListener('mousedown', handler )

  //   return () => {
  //     document.removeEventListener('mousedown', handler)
  //   }


  // })
  
  


    //console.log(allowedEditor)

    const [title, setTitle ] = useState(header)
    const [text, setText ] = useState(content)
    const [isPrivate, setIsPrivate ] = useState<boolean>(noteIsPrivate)
    const [newEditorName, setNewEditorName ] = useState('')


    const dialog: JSX.Element | null = inviteModal ? 
    (
      ( <dialog className=' h-1/2 w-full align-middle bg-gray-300 rounded-md backdrop:bg-gray-800/50 ' ref={dialogRef}>
        <form className='' >

        
        <div className='flow-root mt-1'>

          <p className=' text-xl font-bold underline float-left ml-4'>Invite Editor</p>

          <button onClick={ closeDialog } className=' float-right text-xl mr-4 font-bold hover:text-red-600'>X</button>
        </div>

        <div className='text-center flex-row '>

        <div className='mb-2'>
          
          <input className=' bg-slate-200 rounded mr-4 ml-4 w-1/3 pl-2' onChange={(e) => { setNewEditorName(e.target.value )}} value={ newEditorName } placeholder='Enter Editor Username' />

        </div>

      <div>

          <button onClick={() => { handleInvite() }} type='button' className='text-center pr-4 pl-4 w-1/3 outline outline-green-400 rounded-lg hover:bg-green-100'>Save Editor</button>

      </div>

        </div>

        <div className='bg-slate-200 mt-3'>
          <p className='text-xl font-bold underline text-center'>Editor Allowed</p>

          <ul className='text-center w-full h-auto'>

            
          {/* {allowedEditor ? (
            <div>

            {allowedEditor.map((u: any) => {
              return (<p>hey</p>)
            })}

            </div>
          ) : null} */}


          {allowedEditor.map((u: any) => {
            return (
            <li className='w-full h-full flex justify-center gap-4'>
              <p className='text-black'>{u.username}</p>
              <button onClick={() => {removeEditor(u._id)}} className='hover:text-red-400'>X</button>
            </li>
            )
              // console.log(e.username)
            })}
          
          {/* {allowedEditor ? (<div className='text-center mt-4'> 
          <li className='w-full h-full'>

            {allowedEditor.map((e: any) => {
              <p className='text-purple-300'>{e.username}</p>
              console.log(e)
            })}

            </li>

          </div>) 
          : <p>'no user are invited'</p>} */}

          </ul>
        </div>

        </form>
        </dialog>)
    ) : 
      null

    
    //use this modal to pop up an input to put a user _id to be able to edit the note so i need to set this madal to true when invite Editor is clicked

     // console.log(header)
     // console.log(content)
     //console.log(editIsPrivate)


     

     

     


  return (
    <div className=''>
      <p className='text-center text-white'>EDIT NOTE</p>
      <form className='bg-slate-200  rounded-md ' onSubmit={handleSubmit}>

       {/* {inviteModal ? 
       (<dialog className=' h-32 w-full align-middle' ref={dialogRef}>
        <p className='text-center text-xl font-bold underline'>Invite Editor</p>
        <input onChange={(e) => { setNewEditorId(e.target.value)}} value={newEditorId} />
       </dialog>) 
       : null} */}
       {dialog}

        <div className='bg-slate-200  rounded-md outline'>
          <EditNoteTipTap setText={setText} text={text} setTitle={setTitle} title={title} isPrivate={isPrivate} setIsPrivate={setIsPrivate} sessionUser={sessionUser} user={user} handleDelete={handleDelete} newEditorName={newEditorName} setNewEditorName={setNewEditorName} inviteModal={inviteModal} setInviteModal={setInviteModal} />
        </div>


      </form>
    </div>
  )
}
