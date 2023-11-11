import React from 'react'

export default function ChangePassword({ oldPwd, setOldPwd, newPwd, setNewPwd, setChangePasswordBlock}) {
  return (
    <div className='mb-4 p-4 text-start '>

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
  )
}
