'use client'
import '../../tiptap.css'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import CodeBlock from '@tiptap/extension-code-block'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {  Ref, useEffect, useRef, useState } from 'react'
import Bold from '@tiptap/extension-bold'
import ViewNoteDropDown from '../ViewNoteDropDown'


const CustomBold = Bold.extend({

  name: 'CustomBold',
  addKeyboardShortcuts() {
    return {

      'Mod-B': () => this.editor.commands.toggleBold(),
    }
  },
})


const MenuBar = ({ editor, title, isPrivate, editButton,  updatedAt, createdAt, handleLike, isLiked, handleSave, isPostLiked, isNoteSaved, madeTime, editedTime  }) => {
    
  const menuRef = useRef<HTMLDivElement>(null);  
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(!editor) null
    
    const handler = (e: any) => {
      if (!menuRef || !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handler )
    // return () => {
    //   document.removeEventListener('mousedown', handler)
    // }
    function removeEvent() {
      document.removeEventListener('mousedown', handler )
    }

    removeEvent()
  }, [editor])
  
  
    if (!editor) {
        return null
    }
    

    const closeDropdown = () => {
      setOpen(false)
    }

    return (
      <>
        <div className='flow-root  '>

          <div className='float-left pl-4'>
            {editButton}
          </div>

          <div className=' float-right pr-4 text-lg' ref={menuRef} >
            <button
            className='text-3xl font-bold' 
            type='button'
            onClick={() => setOpen(!open)}
            >...</button>

            {open && (
              <ViewNoteDropDown setOpen={setOpen} open={open} 
              isPrivate={isPrivate} handleSave={handleSave} 
              isNoteSaved={isNoteSaved} handleLike={handleLike} 
              isPostLiked={isPostLiked} />
            )}
          </div>
          
        </div>
        
        <div className='flex justify-center pl-10'>
          <h2 className='  mb-6  rounded-md text-2xl p-1 '> { title } </h2>
        </div>

        <div className='block text-center md:flex justify-evenly mb-4 font-semibold text-sm'>
      
          <p>Created At: {createdAt} : {madeTime}</p>
          <p>Updated At: {updatedAt}: {editedTime}</p>

        </div>
      </>
    )

  }

const ViewNoteTipTap = ({  text,  title, isPrivate, editButton, updatedAt, createdAt, handleLike, isLiked, handleSave, isPostLiked, isNoteSaved, madeTime, editedTime  }) => {
  const editor = useEditor({
    extensions: [
      CustomBold,
      StarterKit.configure({
      }),
      CodeBlock.configure({
        languageClassPrefix: 'language-js',
        HTMLAttributes: {
            class: 'bg-slate-800 text-white p-3 mb-2 mt-2 rounded-lg'
        }
      }),
    ],

    editable: false,

    editorProps: {
        attributes: {
            class: 'bg-slate-200  p-2 outline-none rounded-md text-clip pl-3 min-h-screen max-h-screen pb-10  '
        },
    },

    content: text,
    // onUpdate: ({ editor }) => {
    //     // const text = editor.getText()
    //     const text = editor.getHTML()
    //     setText(text)
    // },

  })
  

  return (
    <div className='mt-1 pt-1'>
      <MenuBar editor={editor}  title={title} 
      isPrivate={isPrivate} editButton={editButton} 
      updatedAt={updatedAt} createdAt={createdAt} 
      handleLike={handleLike} isLiked={isLiked} 
      handleSave={handleSave} isPostLiked={isPostLiked} 
      isNoteSaved={isNoteSaved} madeTime={madeTime} 
      editedTime={editedTime}  />
      <EditorContent editor={editor} />
    </div>
  )
}

export default ViewNoteTipTap





// <div className="mt-1 origin-bottom-left absolute right-10 S w-56 rounded-md   shadow-sm bg-white ring-1 ring-white ring-opacity-5 visible " >
//     <ul className='' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//         <li className='bg-gray-300 flex justify-evenly'>
//             <button
//                 className='w-full'

//                 onClick={() => {
//                   setOpen(!open)

//                 }}
//             >
//                 Is Private :
//             </button>
//             <input
//             className='mr-2 ' 
//             type='checkbox' 
//             checked={isPrivate}
//             readOnly
//             />
//         </li>
//         <li className='bg-gray-200 flex justify-evenly'>
//             <button
//                 className='pl-1 pr-1 hover:bg-white rounded-md w-full'

//                 onClick={handleSave}
//             >
//                 Save
//             </button>

//             <input
//             className=' cursor-pointer mr-2' 
//             type='checkbox' 
//             onChange={handleSave}
//             checked={isNoteSaved}

//             />
//         </li>
//         <li className='bg-gray-300 flex justify-evenly '>
//             <button
//                 className='pl-1 pr-1 hover:bg-white rounded-md w-full'
//                 onClick={handleLike}
//             >
//                 Like
//             </button>
//             <input
//             className='cursor-pointer mr-2' 
//             type='checkbox' 
//             onChange={handleLike}
//             checked={isPostLiked}

//             />
//         </li>
//     </ul>
// </div>