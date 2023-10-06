'use client'
import '../tiptap.css'

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


const ydoc = new Y.Doc() 

const provider = new WebrtcProvider('tiptaptogether2', ydoc)



const  CustomBold = Bold.extend({

  name: 'CustomBold',
  addKeyboardShortcuts() {
    return {

      'Mod-B': () => this.editor.commands.toggleBold(),
    }
  },
})







const MenuBar = ({ editor, setTitle, title, isPrivate, setIsPrivate, sessionUser, user, handleDelete, newEditorId , setNewEditorId }) => {
    if (!editor) {
        return null
    }

    let author = false

    if(sessionUser === user) {
      author = true
    }

    //console.log(author)

    const [open, setOpen] = useState(false)

    const closeDropdown = () => {
      setOpen(false)
    }

    return (

      <>

      <div className=''>


      <div className='flow-root  '>

      <div className='  float-left pl-10 '>
      {/* <Link className='outline p-2 rounded-md hover:bg-gray-300' href={`/notes/${noteId}/edit`}> Edit </Link> */}

        {author ? (<button className='hover:bg-blue-200 p-1 rounded-md outline outline-2 outline-blue-400' type='submit'> Save </button>) : null }


        {/* <button className='hover:bg-blue-200 p-1 rounded-md outline outline-2 outline-blue-400' type='submit'> Save </button> */}


      </div>
      

          

        <div className=' float-right pr-10' >
            <button 
            className='text-3xl'
            type='button'
            onClick={() => setOpen(!open)}
            >...</button>


    {open && (
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
                                    onClick={closeDropdown}
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
                )}



        </div>
        
      </div>
      
      <div className='flex justify-center pl-10'>
        <input 
        placeholder='Title'
        onChange={e => setTitle(e.target.value)}
        value={title}
        className=' md:w-80 mb-6 h-6 rounded-md text-lg p-3 '

        />
      </div>

        <div className=' lg:outline outline-1 outline-offset-8 gap-y-3 lg:mr-40 lg:ml-40 xl:mr-60 xl:ml-60  text-center mb-4  flex justify-evenly  lg:grid grid-rows-2 grid-cols-3 '>

        

        
        <button
        type='button'
        className={editor.isActive('bold') ? 'is-active' : ''}
        onClick={() => editor.chain().focus().toggleBold().run()}
        
        >
        toggleBold
      </button>

      

      <button
      type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        H1
      </button>
      
      


      {/* useEffect(() => {
    editor?.commands.setHeading({ level: 1})
  }) */}

      <button
      type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>

      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        
      >
        H3
      </button> */}

      <button
      type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        toggleStrike
      </button>


      <button
      type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        toggleCodeBlock
      </button>

      </div>
      
      </div>

    </>
    )

  }

const EditNoteTipTap = ({ setText, text, setTitle, title, isPrivate, setIsPrivate, sessionUser, user, handleDelete,  newEditorId , setNewEditorId }) => {
  const editor = useEditor({

  

    extensions: [
      CustomBold,
      StarterKit.configure({

        history: false,

        

      }),

      CodeBlock.configure({
        languageClassPrefix: 'language-',
        HTMLAttributes: {
            class: 'bg-slate-800 text-white p-3 mb-2 mt-2 rounded-lg'
        }
      }),

      Collaboration.configure({
        document: ydoc,
      }),

      // Heading.configure({
      //   levels: [1, 2, 3],
      // }),
      
    ],
    editorProps: {
        attributes: {
            class: 'bg-slate-300  p-2 outline-none rounded-md text-clip pl-3 min-h-screen max-h-screen   pb-10    '
        },
    },

    content: text,
    onUpdate: ({ editor }) => {
        // const text = editor.getText()
        const text = editor.getHTML()
        setText(text)
    },

    
  })
  
  
  
  

  //we will have to make a new components for just the toggle buttons and have to make a div to keep the menubar and editorcontent together while moving the toggle buttons to the side 

  return (
    <div className='mt-4 pt-4 '>
     
   
    <MenuBar editor={editor} setTitle={setTitle} title={title} isPrivate={isPrivate} setIsPrivate={setIsPrivate} sessionUser={sessionUser} user={user} handleDelete={handleDelete}  newEditorId={newEditorId}  setNewEditorId={setNewEditorId} />
   
    <EditorContent   editor={editor} />
    </div>
  )
}

export default EditNoteTipTap


// i could make a new editor and add it to the return or i could just make a <input /> and onchange setTitle 