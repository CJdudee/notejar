

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import CodeBlock from '@tiptap/extension-code-block'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import Bold from '@tiptap/extension-bold'

import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

const  CustomBold = Bold.extend({

    name: 'CustomBold',
    addKeyboardShortcuts() {
      return {
  
        'Mod-B': () => this.editor.commands.toggleBold(),
      }
    },
    })

export const editorConfig = (text, setText) => useEditor({
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
      // Collaboration.configure({
      //   document: ydoc,
      // }),
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
    },})