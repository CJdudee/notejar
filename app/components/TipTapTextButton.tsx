import React from 'react'

export default function TipTapTextButton({editor}) {
  return (
    <div className=' gap-y-3 text-center mb-4  grid grid-rows-2 grid-cols-3 md:flex justify-evenly'>

        <button
        type='button'
        className={editor.isActive('bold') ? 'outline outline-1 rounded-lg px-2 mx-2 hover:text-gray-400 bg-purple-100' : 'hover:text-gray-400'}
        onClick={() => editor.chain().focus().toggleBold().run()}
        
        >
        Bold
        </button>

      

      <button
      type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'tiptapbutton' : 'hover:text-gray-400'}
      >
        H1
      </button>
      
      <button
      type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'tiptapbutton' : 'hover:text-gray-400'}
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
        className={editor.isActive('strike') ? 'tiptapbutton ' : 'hover:text-gray-400'}
      >
        Strike
      </button>


      <button
      type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('code') ? 'tiptapbutton' : 'hover:text-gray-400'}
      >
        Code Block
      </button>

      </div>
  )
}
