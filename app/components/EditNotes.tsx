'use client'
// we have to fetch this inside of the edit notes page and then we can send this data down as props to use in a useState and be able to handle edits and more 
//one way of doing this is making the edit page a use client page and then send the data down to here
//or we can leave it as a server comp but i really dont need to do that but we will see when we get there 
import React, { useState } from 'react'


import { useRouter } from 'next/navigation'
import NewNoteTipTap from './NewNoteTipTap'

export default function EditNotes({content, header, isPrivate: noteIsPrivate, noteId} : {
    content: string,
    header: string, 
    isPrivate: boolean
    noteId: string
}) {



     

  const [title, setTitle ] = useState(header)
     const [text, setText ] = useState(content)
     const [isPrivate, setIsPrivate ] = useState<boolean>(noteIsPrivate)

     // console.log(header)
     // console.log(content)
     //console.log(editIsPrivate)


     const router = useRouter()

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
      <form className='bg-slate-200   rounded-md ' onSubmit={handleSubmit}>

       

        <div className='bg-slate-200    rounded-md outline'>
          <NewNoteTipTap setText={setText} text={text} setTitle={setTitle} title={title} isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
        </div>


      </form>
    </div>
  )
}
