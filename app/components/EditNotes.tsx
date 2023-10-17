'use client'
// we have to fetch this inside of the edit notes page and then we can send this data down as props to use in a useState and be able to handle edits and more 
//one way of doing this is making the edit page a use client page and then send the data down to here
//or we can leave it as a server comp but i really dont need to do that but we will see when we get there 
import React, { useEffect, useRef, useState } from 'react'


import { useRouter, useSearchParams } from 'next/navigation'
import NewNoteTipTap from './NewNoteTipTap'
import EditNoteTipTap from './EditNoteTipTap'
import Link from 'next/link'

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


  const router = useRouter()

  const closeDialog = () => {
    setInviteModal(false)
  }

 

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

    //console.log(allowedEditor)

    const [title, setTitle ] = useState(header)
    const [text, setText ] = useState(content)
    const [isPrivate, setIsPrivate ] = useState<boolean>(noteIsPrivate)
    const [newEditorName, setNewEditorName ] = useState('')

    console.log(pendingEditor)

    let checkPending

    let checkEditor

    if(pendingEditor.length) {

      checkPending = pendingEditor.map((u: any) => {
        return (
        <li key={u._id} className='w-full h-full flex justify-center gap-4'>


          <div className='flex gap-1'>


          <Link href={`/profile/${u._id}`} className='text-black hover:text-gray-500'>{u.username}</Link>
          <div className='w-4 h-4 rounded-xl mt-1' style={{background: u.profileColor}}/>

          </div>

          <button onClick={() => {removePendingInvite(u._id)}} type='button' className='hover:text-red-400 font-bold'>X</button>
        </li>
        )
          // console.log(e.username)
        })

    } else {
      checkPending = (
        <div className='text-center p-1'>

        <p className='font-semibold underline underline-offset-2'>No Pending Editor</p>
        </div>
      )
    }

    if(allowedEditor.length) {

      checkEditor = allowedEditor.map((u: any) => {
        return (
          <li key={u._id} className='w-full h-full flex justify-center gap-4'>


          <div className='flex gap-1'>


          <Link href={`/profile/${u._id}`} className='text-black hover:text-gray-500'>{u.username}</Link>
          <div className='w-4 h-4 rounded-xl mt-1' style={{background: u.profileColor}}/>

          </div>

          <button onClick={() => {removeEditor(u._id)}} type='button' className='hover:text-red-400 font-bold'>X</button>
        </li>
        )
          // console.log(e.username)
        })

    } else {
      checkEditor = (
        <div className='text-center p-1'>

        <p className='font-semibold underline underline-offset-2'>No Pending Editor</p>
        </div>
      )
    }


    const dialog: JSX.Element | null = inviteModal ? 
    (
      ( <dialog className=' w-full xl:w-3/4 align-middle bg-gray-300 rounded-md backdrop:bg-gray-800/50 ' ref={dialogRef}>
        <div className='pb-2' >

        
        <div className='flow-root mt-1 '>

          <p className=' text-xl font-bold underline float-left ml-4'>Invite Editor</p>

          <button onClick={ closeDialog } type='button' className=' float-right text-xl mr-4 font-bold hover:text-red-600'>X</button>

        </div>


        <div className='text-center mt-2'>

        <div className='mb-2 max-w-4xl mx-auto        '>

          
         

          
          
          <input className=' bg-slate-100 rounded mr-4 ml-4 w-1/3 pl-2  ' onChange={(e) => { setNewEditorName( e.target.value )}} value={ newEditorName } placeholder='Enter Editor Username' />
          
          
          
          
        


          <button onClick={() => { handleInvite() }} type='button' className='text-center pr-4 pl-4 w-1/3 outline outline-green-400 rounded-lg hover:bg-green-100  '>Save Editor</button>
          
         
          
          

        </div>


        </div>

        <div className='bg-slate-100 mt-4 mx-2 rounded-xl py-2'>
          <p className='text-xl font-bold underline text-center'>Editor Allowed</p>

          <ul className={allowedEditor.length ? 'text-center w-full h-auto mt-2 grid-cols-3 gap-2' : 'text-center'}>

            {checkEditor}
          
          </ul>
        </div>

        <div className='bg-slate-100 mt-2 mx-2 rounded-xl py-2'>
          <p className='text-xl font-bold underline text-center'>Pending Editor</p>

          <ul className={ pendingEditor.length ? 'text-center w-full h-auto mt-2 grid grid-cols-3 gap-2' : 'text-center'}>

            {checkPending} 
          
          </ul>
        </div>

        </div>
        </dialog>)
    ) : 
      null

    
    //use this modal to pop up an input to put a user _id to be able to edit the note so i need to set this madal to true when invite Editor is clicked

     // console.log(header)
     // console.log(content)
     //console.log(editIsPrivate)


  return (
    <div className='p-4'>
      <p className='text-center text-white'>EDIT NOTE</p>
      <form className='bg-slate-200  rounded-md max-w-4xl mx-auto  ' onSubmit={handleSubmit}>

       {/* {inviteModal ? 
       (<dialog className=' h-32 w-full align-middle' ref={dialogRef}>
        <p className='text-center text-xl font-bold underline'>Invite Editor</p>
        <input onChange={(e) => { setNewEditorId(e.target.value)}} value={newEditorId} />
       </dialog>) 
       : null} */}
       {dialog}

        <div className='bg-slate-200  rounded-md outline '>
          <EditNoteTipTap setText={setText} text={text} setTitle={setTitle} title={title} isPrivate={isPrivate} setIsPrivate={setIsPrivate} sessionUser={sessionUser} user={user} handleDelete={handleDelete} newEditorName={newEditorName} setNewEditorName={setNewEditorName} inviteModal={inviteModal} setInviteModal={setInviteModal} />
        </div>


      </form>
    </div>
  )
}



{/* {allowedEditor ? (<div className='text-center mt-4'> 
          <li className='w-full h-full'>

            {allowedEditor.map((e: any) => {
              <p className='text-purple-300'>{e.username}</p>
              console.log(e)
            })}

            </li>

          </div>) 
          : <p>'no user are invited'</p>} */}

          {/* {allowedEditor.map((u: any) => {
            return (
            <li className='w-full h-full flex justify-center gap-4'>
              <p className='text-black'>{u.username}</p>
              <button onClick={() => {removeEditor(u._id)}} className='hover:text-red-400'>X</button>
            </li>
            )
              // console.log(e.username)
            })} */}


            {/* {pendingEditor.map((u: any) => {
            return (
            <li className='w-full h-full flex justify-center gap-4'>
              <p className='text-black'>{u.username}</p>
              <button onClick={() => {removeEditor(u._id)}} className='hover:text-red-400'>X</button>
            </li>
            )
              // console.log(e.username)
            })} */}

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