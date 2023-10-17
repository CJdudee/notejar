import React from 'react'

export default function EditNoteDropDown({setOpen, open, isPrivate, setIsPrivate, closeDropdown, setInviteModal, inviteModal, author, handleDelete}) {
  return (
    <div className="mt-1 origin-top-right absolute right-0 S w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 visible">
        <ul className='' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <li className='bg-gray-300 flex justify-evenly'>
                <button
                    className=' hover:bg-white rounded-md w-full'
                    
                    onClick={() => {
                        setOpen(!open)
                        setIsPrivate(!isPrivate)
                    }}
                >
                    Is Private :
                </button>
                <input
                className='mr-2 cursor-pointer' 
                type='checkbox' 
                checked={isPrivate}
                onChange={() => {
                    setOpen(!open)
                    setIsPrivate(!isPrivate)
                }}
                />
            </li>
            <li className='bg-gray-200 flex justify-evenly'>
                <button
                    className='hover:bg-white rounded-md w-full'
                    onClick={() => {
                        closeDropdown() 
                        setInviteModal(!inviteModal)
                    }}
                >
                    Invite Editor
                </button>
            </li>
            {author ? 
            (<li className='bg-gray-200 flex justify-evenly'>
                <a
                    className='hover:bg-red-400 rounded-md w-full hover:text-white text-center cursor-pointer'
                    onClick={() => {
                        closeDropdown()
                        handleDelete()
                    }}
                >
                    DELETE NOTE
                </a>
            </li>) : 
            
            null}
            
        </ul>
    </div>
  )
}
