'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'


// const imageLoader = ({ src, width, quality}) => {
//     return `https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fantagonists%2Fimages%2F9%2F9e%2FAlaskan_Bull_Worm.png%2Frevision%2Flatest%3Fcb%3D20220720212415&tbnid=L8Zf8XB729jalM&vet=12ahUKEwj7vZnV8t-BAxWEPkQIHSfBCa4QMygAegQIARB4..i&imgrefurl=https%3A%2F%2Fantagonists.fandom.com%2Fwiki%2FAlaskan_Bull_Worm&docid=0Qwxs_tko1S5jM&w=756&h=507&q=spongebob%20worm&ved=2ahUKEwj7vZnV8t-BAxWEPkQIHSfBCa4QMygAegQIARB4`
// }

export default function page() {


    const {data: session, status } = useSession({ 
        required: true, 
        onUnauthenticated() {
            router.push('/')
        }
    })

    const [username, setUsername] = useState('')
    const [oldPwd, setOldPwd ] = useState('')
    const [newPwd, setNewPwd ] = useState('')

    const [ profileImg, setProfileImg ] = useState('')

    
    
   

    
    
    useEffect(() => {
        
        console.log(status)

        if(status === 'authenticated') {

            console.log(session?.user.name)
            
            setUsername(session?.user.name)
            
            
        }
        
    }, [status])

    if(status ==='loading' && !username === null) {
        return (
            <p>...Loading</p>
        )
    }



    
    const router = useRouter()

   

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const target = e.currentTarget

        
        //  const isPrivate = target.elements.namedItem('checkbox') as HTMLInputElement

        const data = {
            username: username,
            oldPwd,
            newPwd
            // header: header.value,
            // content: content.value,
            // isPrivate: isPrivate.value
        }


        try {
            const response = await fetch('/api/users', {
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

        // console.log(isPrivate.value)
       

        router.push('/')

    }


  return (
    <form onSubmit={handleSubmit} className=' p-4'>

    <div className='bg-slate-300 rounded p-4'>

        <div className='flow-root'>
            <button type='submit' className=' float-right mt-4'>Save</button>
        </div>

        <div className='grid grid-cols-2'>

        

    <div className='mb-4 p-4 text-start  '>
            <label className='text-2xl  ' htmlFor='username'>
                Username
            </label>
            
            <div className='mt-2'>

            <input 
            className='    w-96 lg:w-1/2 rounded-md  pl-2 '
            id='username'
            type='text'
            name='username'
            value={username}
            onChange={(e) => { setUsername(e.target.value)}}
            required
            minLength={3}
            />
            </div>

        </div>

        <div className='mb-4 p-4 text-start  '>

            <div className='flex gap-2'>

            

            <label className='text-2xl  ' htmlFor='username'>
                Profile Color
            </label>

            {/* https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F3%2F3b%2FSpongeBob_SquarePants_character.svg%2F1200px-SpongeBob_SquarePants_character.svg.png&tbnid=yMGXcLeRREWtZM&vet=12ahUKEwjr4Oy2jd6BAxUuh-4BHcSbIw4QMygAegQIARB1..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSpongeBob_SquarePants_(character)&docid=QJghRjEztyfmyM&w=1200&h=1200&q=spongebob&ved=2ahUKEwjr4Oy2jd6BAxUuh-4BHcSbIw4QMygAegQIARB1 */}
 
           <div style={{ backgroundColor: profileImg ? profileImg : '#fff'}} className='w-7 h-7 rounded-xl'></div>

           </div>
            
            <div className='mt-2'>

            <input 
            className=' w-96 lg:w-1/2 rounded-md  pl-2 '
            id='username'
            type='text'
            name='username'
            value={profileImg}
            onChange={(e) => { setProfileImg(e.target.value)}}
            required
            minLength={3}
            autoComplete='off'
            />
            </div>

        </div>

        </div>

        

        <div>

        

        <div className='mb-4 p-4 text-start  '>

            <p className='text-center mb-2 text-2xl'>Change Password</p>

            <div className='outline outline-offset-2 text-center p-4'>

            

            <label className='text-2xl  ' htmlFor='username'>
                Old Password
            </label>
            
            <div className='mt-2'>

            <input 
            className='    w-96 lg:w-1/2 rounded-md  pl-2 '
            id='username'
            type='password'
            name='username'
            value={oldPwd}
            onChange={(e) => { setOldPwd(e.target.value)}}
            required
            minLength={3}
            />
            </div>

            <label className='text-2xl  ' htmlFor='username'>
                New Password
            </label>
            
            <div className='mt-2'>

            <input 
            className='    w-96 lg:w-1/2 rounded-md  pl-2 '
            id='username'
            type='password'
            name='username'
            value={newPwd}
            onChange={(e) => { setNewPwd(e.target.value)}}
            required
            minLength={3}
            />
            </div>


            </div>

        </div>

        </div>

    </div>

    </form>
  )
}
