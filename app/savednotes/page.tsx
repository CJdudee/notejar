import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { options } from '../api/auth/[...nextauth]/options'
import SavedNotes from '../components/SavedNotes'


export default async function page() {

    const session = await getServerSession(options)
    if(!session || !session.user.id) return redirect('/')

    const notes = await fetch(`http://localhost:3000/api/users/saved/${session.user.id}`, { cache: 'no-cache'})
    const savedNotesJson = await notes.json() 

    // console.log(savedNotesJson)
    // if(!savedNotesJson.length) {
    //     return <p>you havent saved any notes</p>
    // }

    return (
        <div className=''>
            <p className='text-white text-center font-bold text-2xl underline  pt-2'>SaveNotes</p>

            <div className='p-4 mt-2  lg:grid-flow-row lg:grid lg:grid-cols-2 gap-2'>

                {!savedNotesJson.length && 
                <p className='p-1 text-center bg-slate-300 rounded-lg mx-auto'>You haven't saved any notes</p>}

                {savedNotesJson.legnth && savedNotesJson.map((r: any) => {
                return (
                    <SavedNotes {...r.noteId} savedAt={r.createdAt} />
                    )
                })}

            </div>
        </div>
  )
}
