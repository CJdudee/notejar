'use client'
import '../tiptap.css'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import CodeBlock from '@tiptap/extension-code-block'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import {  Ref, useEffect, useRef, useState } from 'react'
import Bold from '@tiptap/extension-bold'


const  CustomBold = Bold.extend({

  name: 'CustomBold',
  addKeyboardShortcuts() {
    return {

      'Mod-B': () => this.editor.commands.toggleBold(),
    }
  },
})









const HomePageTipTap = ({  text  }) => {
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

      // Heading.configure({
      //   levels: [1, 2, 3],
      // }),
      
    ],

    editable: false,

    editorProps: {
        attributes: {
            class: 'bg-slate-300  p-2 outline-none rounded-md text-clip pl-3 h-48  pb-10  '
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
    <div className=' pt-4'>
     
   
    
   
    <EditorContent   editor={editor} />
    </div>
  )
}

export default HomePageTipTap


// i could make a new editor and add it to the return or i could just make a <input /> and onchange setTitle 