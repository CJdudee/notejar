'use client'
import '../../tiptap.css'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import CodeBlock from '@tiptap/extension-code-block'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { useEffect, useState } from 'react'
import Bold from '@tiptap/extension-bold'

//import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import TipTapTextButton from './TipTapTextButton'
import { editorConfig } from '@/utils/tiptapConfig'


// const ydoc = new Y.Doc() 

// const provider = new WebrtcProvider('tiptaptogether', ydoc)



const  CustomBold = Bold.extend({

  name: 'CustomBold',
  addKeyboardShortcuts() {
    return {

      'Mod-B': () => this.editor.commands.toggleBold(),
    }
  },
})


const MenuBar = ({ editor, setTitle, title, isPrivate, setIsPrivate }) => {
    

    const [open, setOpen] = useState(false)
    
    if (!editor) {
      return null
  }

    const closeDropdown = () => {
      setOpen(false)
    }

    return (
      <div className=''>


      <div className='flow-root  '>

        <div className='  float-left pl-10 '>

          <button className='hover:bg-blue-200 p-1 rounded-md outline outline-1 outline-blue-400' type='submit'> Save </button>
          
        </div>
      

          

        <div className=' float-right pr-10' >
          <button 
          className='text-3xl font-bold'
          type='button'
          onClick={() => setOpen(!open)}
          >...</button>


          {open && (
    <div className="mt-1 origin-top-right absolute right-4 S w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 visible">

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
            
        </ul>

    </div>
          )}



        </div>
        
      </div>
      {/* end of flow root */}

      <div className='flex justify-center'>

        <input 
        placeholder='Title'
        onChange={e => setTitle(e.target.value)}
        value={title}
        className=' md:w-80 mb-6 h-6 rounded-md text-lg p-3 '
        />

      </div>

      <TipTapTextButton editor={editor} />
      
      </div>

    
    )

  }

const NewNoteTipTap = ({ setText, text, setTitle, title, isPrivate, setIsPrivate }) => {
  // const editor = useEditor({
  //   extensions: [
  //     CustomBold,
  //     StarterKit.configure({
  //       history: false,
  //     }),

  //     CodeBlock.configure({
  //       languageClassPrefix: 'language-',
  //       HTMLAttributes: {
  //           class: 'bg-slate-800 text-white p-3 mb-2 mt-2 rounded-lg'
  //       }
  //     }),

  //     // Collaboration.configure({
  //     //   document: ydoc,
  //     // }),

  //     // Heading.configure({
  //     //   levels: [1, 2, 3],
  //     // }),
  //   ],
  //   editorProps: {
  //       attributes: {
  //           class: 'bg-slate-300  p-2 outline-none rounded-md text-clip pl-3 min-h-screen max-h-screen   pb-10    '
  //       },
  //   },

  //   content: text,
  //   onUpdate: ({ editor }) => {
  //       // const text = editor.getText()
  //       const text = editor.getHTML()
  //       setText(text)
  //   },

    
  // })
  
  
  const editor = editorConfig(text, setText)
  

  //we will have to make a new components for just the toggle buttons and have to make a div to keep the menubar and editorcontent together while moving the toggle buttons to the side 

  return (
    <div className='mt-4 pt-3 '>
      <MenuBar editor={editor} setTitle={setTitle} 
      title={title} isPrivate={isPrivate} 
      setIsPrivate={setIsPrivate} />
      <EditorContent   editor={editor} />
    </div>
  )
}

export default NewNoteTipTap


