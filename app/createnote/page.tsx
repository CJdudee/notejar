'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import NewNoteTipTap from '../components/tiptapEditors/NewNoteTipTap'

export default function Page() {

    const [text, setText ] = useState('')

    const [title, setTitle ] = useState('')

    const [isPrivate, setIsPrivate ] = useState(true)

    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.currentTarget

    //  const isPrivate = target.elements.namedItem('checkbox') as HTMLInputElement

    const data = {
        header: title,
        content: text,
        isPrivate
        // header: header.value,
        // content: content.value,
        // isPrivate: isPrivate.value
    }


    try {
        const response = await fetch('/api/note', {
            method: "POST",
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

    // console.log(isPrivate.value)
        router.push('/')

    }

  return (
    <div className='p-4  '>

        <p className='flex justify-center text-white font-bold text-xl'>NEW NOTE</p>

        <form onSubmit={handleSubmit} className='bg-slate-200   rounded-md max-w-4xl mx-auto '>
            <div className=' bg-slate-200  rounded-md outline'>
                <NewNoteTipTap setText={setText} text={text} setTitle={setTitle} title={title} isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
            </div>

        </form>

    </div>
)
}




{/* <div className='mt-4 bg-slate-400 pb-4 pt-4 rounded flex justify-evenly'>

    <div className='flex justify-evenly w-full pl-1'>

    

    

    <button className=''>Save</button>


    <input type='text' className=' pl-1 bg-slate-400 underlind text-2xl placeholder-black hover:placeholder-transparent outline outline-1' placeholder='Title'></input>

    

    <div className='gap-4 flex pr-1 '>
        <button className='outline outline-2 outline-slate-600 w-7 h-7  rounded'>b</button>
        <button className='outline outline-2 outline-slate-600 w-7 h-7  rounded'>u</button>
        <button className='outline outline-2 outline-slate-600 w-7 h-7  rounded'>i</button>
        <input type='color' className='h-7 w-7 rounded  bg-transparent   ' />
    </div>

<NoteDropDown />
    
</div>

</div> */}

{/* <textarea  className='w-full h-full min-h-full pl-1 pr-1 outline-none'
rows={24} /> */}
