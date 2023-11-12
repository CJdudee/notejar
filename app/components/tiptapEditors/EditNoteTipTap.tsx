'use client'
import '../../tiptap.css'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import CodeBlock from '@tiptap/extension-code-block'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import Bold from '@tiptap/extension-bold'
import EditNoteDropDown from '../EditNoteDropDown'
import TipTapTextButton from './TipTapTextButton'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { HocuspocusProvider, TiptapCollabProvider } from "@hocuspocus/provider";
// import { WebrtcProvider } from 'y-webrtc'

//it will be ran on port=4444 ws://localhost:4444

// const ydoc = new Y.Doc()

//to start the server run    node ./node_modules/y-webrtc/bin/server.js
  // const provider = new WebrtcProvider('tiptaptogether', ydoc, { signaling: ['ws://localhost:4444']}) 

//const provider = new WebrtcProvider('tiptaptogether', ydoc, { signaling: ['ws://localhost:3000']})

  const  CustomBold = Bold.extend({

  name: 'CustomBold',
  addKeyboardShortcuts() {
    return {

      'Mod-B': () => this.editor.commands.toggleBold(),
    }
  },
  })


const MenuBar = ({ editor, setTitle, title, isPrivate, setIsPrivate, sessionUser, user, handleDelete, newEditorName , setNewEditorName,  inviteModal, setInviteModal }) => {
    
    const [open, setOpen] = useState(false)
  
    if (!editor) {
        return null
    }

    let author = false

    if(sessionUser === user) {
      author = true
    }

    //console.log(author)

   

    const closeDropdown = () => {
      setOpen(false)
    }

    return (
      <div className=''>
        <div className='flow-root  '>

          <div className='  float-left pl-10 '>
            {author ? (<button className='hover:bg-blue-200 px-2 rounded-md outline outline-1 outline-blue-400' type='submit'> Save </button>) : null }
          </div>
        
          {author ?
          <div className=' float-right pr-10' >
            <button 
            className='text-3xl font-bold'
            type='button'
            onClick={() => setOpen(!open)}
            >...</button>

            {open && (
            <EditNoteDropDown closeDropdown={closeDropdown} author={author} 
            handleDelete={handleDelete} setInviteModal={setInviteModal} 
            inviteModal={inviteModal} setIsPrivate={setIsPrivate} 
            isPrivate={isPrivate} setOpen={setOpen} open={open} />
            )}
          </div>
          : null}
          
        </div>
          {/* end of Save button and Dropdown */}
        
        <div className='flex justify-center pl-10 mb-2 mt-2'>
          <input 
          placeholder='Title'
          onChange={e => setTitle(e.target.value)}
          value={title}
          className=' md:w-80 mb-6 h-6 rounded-md text-lg p-3 '

          />
        </div>

          {/* start of the text button */}
          <TipTapTextButton editor={editor} />
        
      </div>

 
    )

  }

const EditNoteTipTap = ({ setText, text, setTitle, title, isPrivate, setIsPrivate, sessionUser, user, handleDelete,  newEditorName , setNewEditorName, inviteModal, setInviteModal, noteId }) => {

  const doc = new Y.Doc()

  useEffect(() => {
    const provider = new HocuspocusProvider({
      name: noteId ? noteId : '2',
      url: 'ws://127.0.0.1:1234',
      document: doc,
      token: 'notoken' // replace with jwt maybe map
    })

    return () => {
      provider.destroy()
    }
  }, [noteId])

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
        document: doc,
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
    
    content: '',
    // onCreate: ({ editor, content }: any) => {
      
    // }
    // onUpdate: ({ editor }) => {
    //     // const text = editor.getText()
    //     const text = editor.getHTML()
        
    //     setText(text)
    //     console.log(noteId)
    // },
    
  })

  // editor.commands.setContent(text)
  useEffect(() => {
    if(!editor) return 

    editor.commands.setContent(text)
  }, [editor])

  return (
    <div className='mt-4 pt-4 '>
      <MenuBar editor={editor} setTitle={setTitle} title={title} isPrivate={isPrivate} setIsPrivate={setIsPrivate} sessionUser={sessionUser} user={user} handleDelete={handleDelete}  newEditorName={newEditorName}  setNewEditorName={setNewEditorName} inviteModal={inviteModal} setInviteModal={setInviteModal} />
    
      <EditorContent   editor={editor} />
    </div>
  )
}

export default EditNoteTipTap






// <div className="mt-1 origin-top-right absolute right-0 S w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 visible">
//     <ul className='' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//         <li className='bg-gray-300 flex justify-evenly'>
//             <button
//                 className=' hover:bg-white rounded-md w-full'

//                 onClick={() => {
//                   setOpen(!open)
//                   setIsPrivate(!isPrivate)
//                 }}
//             >
//                 Is Private :
//             </button>
//             <input
//             className='mr-2 cursor-pointer' 
//             type='checkbox' 
//             checked={isPrivate}
//             onChange={() => {
//               setOpen(!open)
//               setIsPrivate(!isPrivate)
//             }}
//             />
//         </li>
//         <li className='bg-gray-200 flex justify-evenly'>
//             <button
//                 className='hover:bg-white rounded-md w-full'
//                 onClick={() => {
//                   closeDropdown() 
//                   setInviteModal(!inviteModal)
//                 }}
//             >
//                 Invite Editor
//             </button>
//         </li>
//         {author ? 
//         (<li className='bg-gray-200 flex justify-evenly'>
//             <a
//                 className='hover:bg-red-400 rounded-md w-full hover:text-white text-center cursor-pointer'
//                 onClick={() => {
//                   closeDropdown()
//                   handleDelete()
//                 }}
//             >
//                 DELETE NOTE
//             </a>
//         </li>) : 

//         null}

//     </ul>
// </div>