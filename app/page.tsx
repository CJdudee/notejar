import { useRouter } from 'next/navigation'
import HomePageNotes from './components/HomePageNotes'
import LoadingProfile from './components/LoadingProfile'
import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'
//tiptap Collaboration is the only feature i need to add now   

//serverComponentsExternalPackages: ['mongoose']

export default async function Page() {

  const session = await getServerSession(options)

  // if(!process.env.NEXT_URL) return null 
  const notes = await fetch(`${process.env.NEXT_URL}/api/note`, { cache: 'no-cache'})
  const notesJson = await notes.json()

  // if(!notes && !notesJson) return <p>Loading</p>

    // if(!notesJson) return <LoadingProfile />
  
  return (
    // <Suspense fallback={<LoadingProfile />}>
    <div className='px-10 py-5  '>
        <p className=' text-2xl mb-3  text-white underline'>HOME PAGE</p>

        <ul className='xl:grid grid-cols-2 gap-4'>
          
          {notesJson.length && notesJson.map((b: any): any => {
          return (
            <HomePageNotes key={b._id} {...b} />
            )
          })}

        </ul>
    </div>
    // </Suspense>
  )
}


