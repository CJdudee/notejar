'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import Select from 'react-select'


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

    async function handleDeleteUser() {

        try {

            const response = await fetch('http://localhost:3000/users', {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error('error with post')
        }

        } catch (error) {
            
        }

        router.push('/')


    }

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

    

    const color = ['blue', 'pink', 'orange', 'purple', 'green'],
    displayoption = function(color) {
        return (
        <option>{color}</option>
        )
    }

    const colorSelect = [
        { value: 'blue', label: 'blue' },
        { value: 'pink', label: 'pink' },
        { value: 'orange', label: 'orange' },
        { value: 'purple', label: 'purple' },
        { value: 'green', label: 'green' },

    ]

    const handleProCol = (selectedOption) => {
        console.log(selectedOption)
        setProfileImg(selectedOption.value)
    }


  return (
    <form onSubmit={handleSubmit} className=' p-4'>

        <p className='text-white'>Turn the choose your profile color with an array </p>

    <div className='bg-slate-300 rounded p-4'>

        <div className='flow-root'>
            <button type='submit' className=' float-left ml-6 outline p-2 rounded outline-2 hover:bg-slate-400 mt-4'>Save</button>
        </div>


        {/* <div className='mt-4'>
            <select  value={profileImg} onChange={(e) => {setProfileImg(e.target.value)}}>
                {color.map(displayoption)}
            </select>
        </div> */}


        <div className='mt-4 w-1/2 p-3'>
        <Select options={colorSelect} onChange={handleProCol} className=' text-sm ' />
        </div>

        {/* //username and profile color div */}
        <div className='grid grid-cols-2 gap-2'>

            <div className='mb-4 p-4 text-start  '>

            <label className='text-2xl font-bold  ' htmlFor='username'>
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

            

            <label className='text-2xl font-bold ' htmlFor='username'>
                Profile Color
            </label>

            
 
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
        {/* //end of username and profile color div */}

        

        <div>

        

        <div className='mb-4 p-4 text-start  '>

            <p className='text-center mb-3 text-2xl font-bold '>Change Password</p>

            <div className='outline outline-offset-2 text-center p-4 rounded-md'>

            

            <label className='text-2xl font-bold  ' htmlFor='username'>
                Old Password
            </label>
            
            <div className='mt-2'>

            <input 
            className='w-96 lg:w-1/2 rounded-md  pl-2 '
            id='username'
            type='password'
            name='username'
            value={oldPwd}
            onChange={(e) => { setOldPwd(e.target.value)}}
            
            
            />
            </div>

            <label className='text-2xl font-bold  ' htmlFor='username'>
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
            
            
            />
            </div>


            </div>

        </div>

        </div>

        <div className='flex justify-center'>
            <button type='button' onClick={() => handleDeleteUser} className='w-1/2 outline  rounded-md hover:bg-red-300'>DELETE USER</button>
        </div>

    </div>

    </form>
  )
}
