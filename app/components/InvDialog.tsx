import Link from 'next/link'
import React from 'react'

export default function InvDialog({ pendingEditor, allowedEditor, removePendingInvite, removeEditor, dialogRef, newEditorName, setNewEditorName, closeDialog, handleInvite}) {

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
      })
    } else {
      checkEditor = (
        <div className='text-center p-1'>
          <p className='font-semibold underline underline-offset-2'>No Pending Editor</p>
        </div>
      )
    }


  return (
    <dialog className=' w-full xl:w-3/4 align-middle bg-gray-300 rounded-md backdrop:bg-gray-800/50 ' ref={dialogRef}>
          <div className='pb-2' >

            <div className='flow-root mt-1 '>

              <p className=' text-xl font-bold underline float-left ml-4'>Invite Editor</p>

              <button onClick={ closeDialog } type='button' className=' float-right text-xl mr-4 font-bold hover:text-red-600'>X</button>

            </div>

            <div className='text-center mt-2'>

              <div className='mb-2 max-w-4xl mx-auto        '>

                <input className=' bg-slate-100 rounded mr-4 ml-4 w-1/3 pl-2 ' 
                onChange={(e) => { setNewEditorName( e.target.value )}} 
                value={ newEditorName } placeholder='Enter Editor Username' />
          
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
        </dialog>
  )
}
