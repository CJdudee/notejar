import HomePageNotes from './components/HomePageNotes'
import LoadingProfile from './components/LoadingProfile'
//tiptap Collaboration is the only feature i need to add now       

export default async function Home() {
  // const session = await getServerSession(options)
  const notes = await fetch(`${process.env.NEXT_URL}/api/note`, { cache: 'no-cache'})
  const notesJson = await notes.json()

  if(!notesJson) return <LoadingProfile />
  return (
    <div className='px-10 py-5  '>
        <p className=' text-2xl mb-3  text-white underline'>HOME PAGE</p>

        <ul className='xl:grid grid-cols-2 gap-4'>

          {notesJson.map((b: any): any => {
            return (
              <HomePageNotes key={b._id} {...b} />
              )
            })}

        </ul>
    </div>
  )
}

//serverComponentsExternalPackages: ['mongoose']
