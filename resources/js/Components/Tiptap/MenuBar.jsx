import React, { useCallback } from "react";
import { useCurrentEditor } from "@tiptap/react";

import { FontFamilyIcon, StrikethroughIcon, Link1Icon, FontBoldIcon, DividerHorizontalIcon, TextIcon, ResetIcon, HeadingIcon, LineHeightIcon } from '@radix-ui/react-icons'
import { Tooltip } from "@/ui/Tooltip";

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
    )

    return (
        <div className=" flex flex-wrap gap-2  text-xs  font-medium px-2 py-2 mb-5 overflow-hidden border-b  border-sand-sand5">
            <Tooltip content={ "Link" }>
                <MenuButton onClick={ setLink } isActive={ editor.isActive("link") }>
                    <Link1Icon />
                </MenuButton>
            </Tooltip>

            <Tooltip content={ "Bold" }>
                <MenuButton
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBold().run();
                    } }
                    disabled={ !editor.can().chain().focus().toggleBold().run() }
                    isActive={ editor.isActive("bold") }
                >
                    <FontBoldIcon />
                </MenuButton>
            </Tooltip>

            <Tooltip content={ "Italic" }>
                <MenuButton
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleItalic().run();
                    } }
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    isActive={ editor.isActive("italic") }
                >
                    <FontFamilyIcon />
                </MenuButton>
            </Tooltip>

            <Tooltip content={ "Strike through" }>
                <MenuButton
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleStrike().run();
                    } }
                    disabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                    isActive={ editor.isActive("Strike") }
                >
                    <StrikethroughIcon />
                </MenuButton>
            </Tooltip>

            <Tooltip content={ "Reset" }>
                <MenuButton
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().unsetAllMarks().run();
                    } }
                    isActive={ editor.isActive("clearMarks") }
                >
                    <ResetIcon />
                </MenuButton>
            </Tooltip>

            <Tooltip content={ "Paragraph" }>
                <MenuButton
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().setParagraph().run();
                    } }
                    isActive={ editor.isActive("paragraph") }
                >
                    <TextIcon />
                </MenuButton>
            </Tooltip>

            <Tooltip content={ "Heading" }>
                <MenuButton
                    onClick={ (e) => {
                        e.preventDefault();
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run();
                    } }
                    isActive={ editor.isActive("heading") }
                >
                    <HeadingIcon />
                </MenuButton>
            </Tooltip>


            <Tooltip content={ "Divider" }>
                <MenuButton
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().setHorizontalRule().run();
                    } }
                    isActive={ editor.isActive("horizontalRule") }
                >
                    <DividerHorizontalIcon />
                </MenuButton>
            </Tooltip>

            <Tooltip content={ "Line Height" }>
                <MenuButton
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().setHardBreak().run();
                    } }
                    isActive={ editor.isActive("hardBreak") }
                >
                    <LineHeightIcon />
                </MenuButton>
            </Tooltip>

            <Tooltip content={ "Undo" }>
                <MenuButton
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().undo().run();
                    } }
                    disabled={ !editor.can().chain().focus().undo().run() }
                    isActive={ editor.isActive("undo") }
                >
                    <UndoIcon />
                </MenuButton>
            </Tooltip>

            <Tooltip content={ "Redo" }>
                <MenuButton
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().redo().run();
                    } }
                    disabled={ !editor.can().chain().focus().redo().run() }
                    isActive={ editor.isActive("redo") }
                >
                    <RedoIcon />
                </MenuButton>
            </Tooltip>

            <Tooltip content={ "Text red" }>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().setColor("#FF977D").run();
                    } }
                    className={ `hover:bg-tomato-tomato4 border  border-tomato-tomato5 flex justify-center items-center w-7 h-7 bg-tomato-tomato3 text-tomato-tomato11 rounded-lg p-1 min-w-max ${editor.isActive('textStyle', { color: '#FF977D' }) ? "border-tomato-tomato6 bg-tomato-tomato5 " : ""}` }
                >
                    text red
                </button>
            </Tooltip>

            <Tooltip content={ "Text green" }>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().setColor("#71D083").run();
                    } }
                    className={ `hover:bg-grass-grass4 border  border-grass-grass4 flex justify-center items-center w-7 h-7 bg-grass-grass3 text-grass-grass11 rounded-lg p-1 min-w-max ${editor.isActive('textStyle', { color: '#71D083' }) ? "border-grass-grass6 bg-grass-grass5" : ""}` }
                >
                    text green
                </button>
            </Tooltip>
        </div>
    );
}


const MenuButton = React.forwardRef(({ onClick, isActive, children, disabled, ...props }, ref) => (
    <button
        ref={ ref }
        onClick={ onClick }
        className={ `rounded-lg p-1 bg-gray-gray3  hover:bg-gray-gray4 border border-gray-gray5 flex justify-center items-center min-w-6 min-h-6 ${isActive ? "bg-gray-gray5 text-gray-gray12 border-sand-sand9 " : ""} ${disabled ? " opacity-80 cursor-not-allowed" : ""}` }
        { ...props }
    >
        { children }
    </button>
));


function UndoIcon() {
    return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={ 1 } stroke="currentColor" className="size-4 stroke-sand-sand11">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
        </svg>
    )
}

function RedoIcon() {

    return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={ 1 } stroke="currentColor" className="size-4 stroke-sand-sand11">
            <path strokeLinecap="round" strokeLinejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
        </svg>
    )
}