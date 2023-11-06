'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import Select from 'react-select'




export default function page() {
    const {data: session, status, update } = useSession({ 
        required: true, 
        onUnauthenticated() {
            router.push('/')
        }
    })

    const [username, setUsername] = useState('')
    const [oldPwd, setOldPwd ] = useState('')
    const [newPwd, setNewPwd ] = useState('')
    const [changePasswordBlock, setChangePasswordBlock ] = useState(false)
    const [ profileImg, setProfileImg ] = useState('')

    //console.log(session.user)
    const router = useRouter()

    if(status ==='loading' && !username === null) {
        return (
            <p>...Loading</p>
        )
    }
    
    useEffect(() => {
        
        console.log(status)

        if(status === 'authenticated') {

            //console.log(session?.user.name)
            
            setUsername(session?.user.name)
            
            
        }
        
    }, [status])

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
            newPwd,
            profileColor: profileImg
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
        
        
            // const updated = await update({ profileColor: profileImg })

            // console.log(updated)

            update({profileColor: profileImg})
        

        // console.log(isPrivate.value)

        router.push('/')

    }

    
    //we could leave this here cause this is gonna be the only place where the colorSelect will be used
    const colorSelect = [
        { value: 'blue', label: 'blue' },
        { value: 'pink', label: 'pink' },
        { value: 'orange', label: 'orange' },
        { value: 'purple', label: 'purple' },
        { value: 'green', label: 'green' },
        { value: 'white', label: 'white' },
        { value: 'brown', label: 'brown ' }

    ]

    const selectStyles = {
        control: (baseStyles) => ({...baseStyles, background: 'gray', color: 'purple', borderColor: 'red'  }),
        option: (styles, {}) => ({ ...styles}),
        
    }

    const handleProCol = (selectedOption) => {
        console.log(selectedOption)
        setProfileImg(selectedOption.value)
    }

    const changePasswordInput = changePasswordBlock ? 
    (
    <div className='mb-4 p-4 text-start  '>

        <p className='text-center mb-3 text-2xl font-bold '>Change Password</p>

        <div className='outline outline-offset-1 outline-1 text-center p-4 rounded-md  block lg:grid grid-cols-2 '>

        {/* old password div */}
            <div className='mb-2'>

                <label className='text-xl font-semibold  ' htmlFor='username'>
                    Old Password
                </label>
                
                <div className='mt-2'>

                    <input 
                    className='w-1/2 lg:w-3/4 rounded-md  pl-2 '
                    id='username'
                    type='password'
                    name='username'
                    value={oldPwd}
                    onChange={(e) => { setOldPwd(e.target.value)}}
                    
                
                />
                </div>

            </div>
            {/* new password div */}
            <div>
                <label className='text-xl font-semibold  ' htmlFor='username'>
                    New Password
                </label>
                
                <div className='mt-2'>
                    <input 
                    className='    w-1/2 lg:w-3/4 rounded-md  pl-2 '
                    id='username'
                    type='password'
                    name='username'
                    value={newPwd}
                    onChange={(e) => { setNewPwd(e.target.value)}}
                />
                </div>
            </div>
        </div>

        <div className='text-center'>
            <button type='button' onClick={() => { setChangePasswordBlock(false), setOldPwd(''), setNewPwd('')}} className='hover:text-gray-500 text-2xl mt-2 font-semibold'>Close</button>
        </div>

    </div>
    ) : 
    (
        <div className='text-center font-bold hover:text-gray-500 mb-4  '>
            <button type='button' className='' onClick={() => { setChangePasswordBlock(!changePasswordBlock)}}>Change password</button>
        </div>
    )


  return (
    <form onSubmit={handleSubmit} className=' max-w-6xl p-3 mx-auto'>

        <div className='bg-slate-300 rounded-lg p-2 px-4'>
            <div className='flow-root'>
                <button type='submit' className='float-left ml-6 outline p-2 rounded outline-2 hover:bg-blue-300 mt-4 outline-blue-400'>Save</button>
            </div>

        {/* //username and profile color div */}
            <div className='block md:grid grid-cols-2 gap-2 rounded-lg    '>
                <div className='mb-4 p-4 text-center   '>

                    <label className='text-2xl font-bold  ' htmlFor='username'>
                        Username
                    </label>
            
                    <div className='mt-2'>

                        <input 
                        className='    w-2/3 md:w-full lg:w-full rounded-md  pl-2 h-9 text-lg text-black font-semibold '
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
        {/* end of the username input */}

        {/* start of the profilecolor input */}
            <div className='mb-4 p-4      '>
                <div className='flex gap-2 justify-center'>

                    <label className='text-2xl font-bold ' htmlFor='username'>
                        Profile Color
                    </label>

                    <div style={{ backgroundColor: profileImg ? profileImg : '#fff'}} className='w-7 h-7 rounded-xl'/>
                </div>
            
                <div className='mt-2 flex justify-center'>

                    <Select classNames={{
                    clearIndicator: () => '',
                    container: () => 'text-black w-2/3 md:w-full lg:w-full text-center   ',
                    indicatorsContainer: () => ' ',
                    control: () => 'bg-white flex p-1 rounded-lg pl-2  ',
                    menu: () => 'rounded-lg mt-1 ',
                    menuList: () => 'bg-white rounded-md text-md ',
                    dropdownIndicator: () => 'rounded-lg ',
                    valueContainer: () => 'rounded-lg text-black text-lg font-semibold   ',
                    group: () => 'text-white bg-slate-300 ',
                    option: () => 'p-1  hover:bg-slate-100',
                    input: () => '',
                    placeholder: () => 'text-black text-md',
                    singleValue: () => ''
                    }}
                    unstyled  
                    isSearchable={false}
                    options={colorSelect} 
                    onChange={handleProCol} 
                    className=' text-sm ' 
                    placeholder={'Pick your profile color'} classNamePrefix='unstyled' />

                </div>

            </div>
            {/* end of the profile color input */}

        </div>
        {/* //end of username and profile color div */}

        {changePasswordInput}

        <div className='flow-root  mb-4'>
            <button type='button' onClick={() => handleDeleteUser} className='float-right w-1/4 outline  rounded-md hover:bg-red-300 outline-2 outline-red-500'>DELETE USER</button>
        </div>

    </div>

    </form>
  )
}



{/* <div>
<button type='button' onClick={() => update({profileColor: profileImg})}>edit profile color</button>
</div> */}

{/* <div className='mt-4'>
<select  value={profileImg} onChange={(e) => {setProfileImg(e.target.value)}}>
{color.map(displayoption)}
</select>
</div> */}

{/* <input 
className=' w-96 lg:w-1/2 rounded-md  pl-2 '
id='username'
type='text'
name='username'
value={profileImg}
onChange={(e) => { setProfileImg(e.target.value)}}
required
minLength={3}
autoComplete='off'
/> */}