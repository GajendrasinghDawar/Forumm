import React from "react";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Link from "@tiptap/extension-link";

import { MenuBar } from "./MenuBar";

const extensions = [
    Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
    }),
    Markdown.configure({
        html: true,
    }),
    Color.configure({ types: [ TextStyle.name, ListItem.name ] }),
    TextStyle.configure({ types: [ ListItem.name ] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
        },
    }),
];

export default function MarkDownEditor({ value, setData }) {

    const intialContent = value;

    function onUpdate({ editor }) {
        const markdownOutput = editor.storage.markdown.getMarkdown();
        setData("body", markdownOutput);
    }

    return (
        <div className="border border-sand-sand6 focus:bg-sand-sand4 focus:border-sand-sand9 focus:ring-0 rounded-md w-full
        ">
            <EditorProvider
                onUpdate={ onUpdate }
                slotBefore={ <MenuBar /> }
                extensions={ extensions }
                content={ intialContent }
                editorProps={ {
                    attributes: {
                        class: "prose prose-sm  sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none overflow-y-auto h-full py-2 px-4 ",
                    },
                } }
            ></EditorProvider>
        </div>
    );
}