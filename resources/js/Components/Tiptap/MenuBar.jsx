import { useCurrentEditor } from "@tiptap/react";
import { useCallback } from "react";

import { FontFamilyIcon, StrikethroughIcon, Link1Icon, FontBoldIcon, DividerHorizontalIcon, TextIcon, ResetIcon, HeadingIcon, LineHeightIcon } from '@radix-ui/react-icons'

export function MenuBar() {
    const { editor } = useCurrentEditor();

    if (!editor)
    {
        return null;
    }

    const setLink = useCallback(
        (e) => {
            e.preventDefault();
            const previousUrl = editor.getAttributes("link").href;
            const url = window.prompt("URL", previousUrl);

            // cancelled
            if (url === null)
            {
                return;
            }

            // empty
            if (url === "")
            {
                editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .unsetLink()
                    .run();

                return;
            }

            // update link
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
        },
        [ editor ]
    );

    if (!editor)
    {
        return null;
    }
    const baseStyle = "rounded-lg p-1 bg-gray-gray3 hover:bg-gray-gray4 border border-gray-gray5 flex justify-center items-center min-w-6 min-h-6";
    const isActiveStyle = "bg-gray-gray5 text-gray-gray12 rounded-md p-1 bg-red-red11";
    return (
        <div className=" flex flex-wrap gap-2  text-xs  font-medium px-2 py-2 mb-5 overflow-hidden border-b  border-sand-sand5">
            <button
                onClick={ setLink }
                className={ `${baseStyle} ${editor.isActive("link") ? isActiveStyle : ""}` }
            >
                <Link1Icon />
            </button>

            <button
                onClick={ (e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBold().run();
                } }
                disabled={ !editor.can().chain().focus().toggleBold().run() }
                className={ `${baseStyle} ${editor.isActive("link") ? isActiveStyle : ""}` }
            >
                <FontBoldIcon />
            </button>
            <button
                onClick={ (e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleItalic().run();
                } }
                disabled={
                    !editor.can().chain().focus().toggleItalic().run()
                }
                className={ `${baseStyle} ${editor.isActive("link") ? isActiveStyle : ""}` }
            >
                <FontFamilyIcon />
            </button>
            <button
                onClick={ (e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleStrike().run();
                } }
                disabled={
                    !editor.can().chain().focus().toggleStrike().run()
                }
                className={ `${baseStyle} ${editor.isActive("link") ? isActiveStyle : ""}` }
            >
                <StrikethroughIcon />
            </button>
            <button
                onClick={ (e) => {
                    e.preventDefault();
                    editor.chain().focus().unsetAllMarks().run();
                } }

                className={ `${baseStyle} ${editor.isActive("link") ? isActiveStyle : ""}` }
            >
                {/* Clear marks */ }
                <ResetIcon />
            </button>
            <button
                onClick={ (e) => {
                    e.preventDefault();
                    editor.chain().focus().setParagraph().run();
                } }
                className={ `${baseStyle} ${editor.isActive("link") ? isActiveStyle : ""}` }
            >
                <TextIcon />
            </button>
            <button
                onClick={ (e) => {
                    e.preventDefault();
                    editor
                        .chain()
                        .focus()
                        .toggleHeading({ level: 2 })
                        .run();
                } }
                className={ `${baseStyle} ${editor.isActive("link") ? isActiveStyle : ""}` }
            >
                {/* H2 */ }
                <HeadingIcon />
            </button>
            <button
                onClick={ (e) => {
                    e.preventDefault();
                    editor.chain().focus().setHorizontalRule().run();
                } }
                className={ `${baseStyle} ${editor.isActive("link") ? isActiveStyle : ""}` }
            >
                {/* Horizontal rule */ }
                <DividerHorizontalIcon />
            </button>
            <button
                onClick={ (e) => {
                    e.preventDefault();
                    editor.chain().focus().setHardBreak().run();
                } }
                className={ `${baseStyle} ${editor.isActive("link") ? isActiveStyle : ""}` }
            >
                {/* Hard break */ }
                <LineHeightIcon />
            </button>
            <button
                onClick={ (e) => {
                    e.preventDefault();
                    editor.chain().focus().undo().run();
                } }
                disabled={ !editor.can().chain().focus().undo().run() }
                className={ `${baseStyle} ${editor.isActive("link") ? isActiveStyle : ""}` }
            >
                <Undo />
            </button>
            <button
                onClick={ (e) => {
                    e.preventDefault();
                    editor.chain().focus().redo().run();
                } }
                disabled={ !editor.can().chain().focus().redo().run() }
                className={ `${baseStyle} ${editor.isActive("link") ? isActiveStyle : ""}` }
            >
                <Redo />
            </button>
            <button
                onClick={ (e) => {
                    e.preventDefault();
                    editor.chain().focus().setColor("#FF977D").run();
                } }
                className={ `hover:bg-tomato-tomato4 border  border-tomato-tomato5 flex justify-center items-center w-7 h-7 bg-tomato-tomato3 text-tomato-tomato11 rounded-lg p-1 min-w-max ${editor.isActive("link") ? isActiveStyle : ""}` }
            >
                text red
            </button>

            <button
                onClick={ (e) => {
                    e.preventDefault();
                    editor.chain().focus().setColor("#71D083").run();
                } }
                className={ `hover:bg-grass-grass4 border  border-grass-grass4 flex justify-center items-center w-7 h-7 bg-grass-grass3 text-grass-grass11 rounded-lg p-1 min-w-max ${editor.isActive("link") ? isActiveStyle : ""}` }
            >
                text green
            </button>
        </div>
    );
}


function Undo() {
    return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={ 1 } stroke="currentColor" className="size-4 stroke-sand-sand11">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
        </svg>

    )
}

function Redo() {

    return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={ 1 } stroke="currentColor" className="size-4 stroke-sand-sand11">
            <path strokeLinecap="round" strokeLinejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
        </svg>
    )
}