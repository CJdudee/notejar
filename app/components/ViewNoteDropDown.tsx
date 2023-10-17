import React from 'react'

export default function ViewNoteDropDown({setOpen, open, isPrivate, handleSave, isNoteSaved, handleLike, isPostLiked}) {
  return (
    <div className="mt-1 origin-bottom-left absolute right-10 S w-56 rounded-md   shadow-sm bg-white ring-1 ring-white ring-opacity-5 visible " >
        <ul className='text-md md:text-lg rounded-md bg-gray-200 outline outline-1 outline-gray-500' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <li className='bg-gray-100 flex justify-evenly rounded-md'>
                <button
                    className='w-full'
                    
                    onClick={() => {
                        setOpen(!open)
                        
                    }}
                >
                    Is Private :
                </button>
                <input
                className='mr-2 ' 
                type='checkbox' 
                checked={isPrivate}
                readOnly
                />
            </li>
            <li className='bg-gray-100 flex justify-evenly rounded-md'>
                <button
                    className='pl-1 pr-1 hover:bg-white rounded-md w-full'
                    
                    onClick={handleSave}
                >
                    Save
                </button>

                <input
                className=' cursor-pointer mr-2' 
                type='checkbox' 
                onChange={handleSave}
                checked={isNoteSaved}
                
                />
            </li>
            <li className='bg-gray-100 flex justify-evenly rounded-md '>
                <button
                    className='pl-1 pr-1 hover:bg-white rounded-md w-full'
                    onClick={handleLike}
                >
                    Like
                </button>
                <input
                className='cursor-pointer mr-2' 
                type='checkbox' 
                onChange={handleLike}
                checked={isPostLiked}
                
                />
            </li>
        </ul>
    </div>
  )
}
