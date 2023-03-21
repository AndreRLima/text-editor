import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
// import BubbleMenu from '@tiptap/extension-bubble-menu'


const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: '<p>Hello World! 🌎️</p>',
    })


    const [isEditable, setIsEditable] = useState(true)

    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditable)
        }
    }, [isEditable, editor])


    return (
        <>
            <div>
                <input type="checkbox" checked={isEditable} onChange={() => setIsEditable(!isEditable)} />
                Editable
            </div>
            {editor && <BubbleMenu shouldShow={(props) => {
                console.log(props)
                const { doc } = props.state
                const { from, to } = props.state.selection
                console.log(doc.textBetween(from, to, null, '\ufffc'))
                //cursor previous character
                const prevChar = doc.textBetween(from - 1, from, null, '\ufffc')
                console.log(prevChar)

                const text = doc.textContent;

                const pattern1 = /{[^{}]*}/g;
                const phrases = text.match(pattern1) || [];
                console.log(phrases)
                for (const phrase of phrases) {
                    const start = text.indexOf(phrase);
                    const end = start + phrase.length - 1;
                    if (from <= end + 2 && to >= start+1) {
                      return true;
                    }
                  }
                
                  return false;





            }} editor={editor} tippyOptions={{ duration: 100 }} >
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`bg-white border-2 border-black p-1 mr-2  ${editor.isActive('bold') ? 'is-active' : ''}`}
                >
                    Contact Field
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`bg-white border-2 border-black p-1 mr-2 ${editor.isActive('italic') ? 'is-active' : ''}`}
                >
                    Research Results
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`bg-white border-2 border-black p-1 mr-2 ${editor.isActive('strike') ? 'is-active' : ''}`}
                >
                    AI
                </button>
            </BubbleMenu>}
            <EditorContent editor={editor} />
        </>
    )
}

export default Tiptap

