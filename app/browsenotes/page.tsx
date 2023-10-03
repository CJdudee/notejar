import React from 'react'
import Link from 'next/link'
import BrowseNote from '../components/BrowseNote'



export default async function page() {

    const notesList = await fetch('http://localhost:3000/api/note', { cache: 'no-cache'})

    const notesJson = await notesList.json()

    console.log(notesJson)

  return (
    <div className='p-4'>
      <ul className='bg-slate-600 p-4 rounded '>

        { notesJson.map((n: any) => {
          return(
            <BrowseNote {...n} />
            
            )
        })}
        </ul>
    </div>
  )
}
