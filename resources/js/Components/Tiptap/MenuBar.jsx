import { useCurrentEditor } from "@tiptap/react";
import { useCallback } from "react";

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
    const isActiveStyle = "bg-purple-600 text-gray-50 rounded-md p-1";
    return (
        <div className=" sticky top-0 flex flex-col bg-gray-200 z-10 p-1">
            <div className=" flex flex-wrap gap-2 border [&>*]:bg-purple-500 [&>*]:p-[2px]  [&>*]:rounded-md text-xs  font-medium">
                <button
                    onClick={ setLink }
                    className={ editor.isActive("link") ? isActiveStyle : "" }
                >
                    Set link
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().unsetLink().run();
                    } }
                    disabled={ !editor.isActive("link") }
                >
                    Unset link
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBold().run();
                    } }
                    disabled={ !editor.can().chain().focus().toggleBold().run() }
                    className={ editor.isActive("bold") ? isActiveStyle : "" }
                >
                    Bold
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleItalic().run();
                    } }
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    className={ editor.isActive("italic") ? isActiveStyle : "" }
                >
                    Italic
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleStrike().run();
                    } }
                    disabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                    className={ editor.isActive("strike") ? isActiveStyle : "" }
                >
                    Strike
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleCode().run();
                    } }
                    disabled={ !editor.can().chain().focus().toggleCode().run() }
                    className={ editor.isActive("code") ? isActiveStyle : "" }
                >
                    Code
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().unsetAllMarks().run();
                    } }
                >
                    Clear marks
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().clearNodes().run();
                    } }
                >
                    Clear nodes
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().setParagraph().run();
                    } }
                    className={
                        editor.isActive("paragraph") ? isActiveStyle : ""
                    }
                >
                    Paragraph
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 1 })
                            .run();
                    } }
                    className={
                        editor.isActive("heading", { level: 1 })
                            ? isActiveStyle
                            : ""
                    }
                >
                    H1
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
                    className={
                        editor.isActive("heading", { level: 2 })
                            ? isActiveStyle
                            : ""
                    }
                >
                    H2
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 3 })
                            .run();
                    } }
                    className={
                        editor.isActive("heading", { level: 3 })
                            ? isActiveStyle
                            : ""
                    }
                >
                    H3
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 4 })
                            .run();
                    } }
                    className={
                        editor.isActive("heading", { level: 4 })
                            ? isActiveStyle
                            : ""
                    }
                >
                    H4
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault;
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 5 })
                            .run();
                    } }
                    className={
                        editor.isActive("heading", { level: 5 })
                            ? isActiveStyle
                            : ""
                    }
                >
                    H5
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 6 })
                            .run();
                    } }
                    className={
                        editor.isActive("heading", { level: 6 })
                            ? isActiveStyle
                            : ""
                    }
                >
                    H6
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBulletList().run();
                    } }
                    className={
                        editor.isActive("bulletList") ? isActiveStyle : ""
                    }
                >
                    Bullet list
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleOrderedList().run();
                    } }
                    className={
                        editor.isActive("orderedList") ? isActiveStyle : ""
                    }
                >
                    Ordered list
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleCodeBlock().run();
                    } }
                    className={
                        editor.isActive("codeBlock") ? isActiveStyle : ""
                    }
                >
                    Code block
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBlockquote().run();
                    } }
                    className={
                        editor.isActive("blockquote") ? isActiveStyle : ""
                    }
                >
                    Blockquote
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().setHorizontalRule().run();
                    } }
                >
                    Horizontal rule
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().setHardBreak().run();
                    } }
                >
                    Hard break
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().undo().run();
                    } }
                    disabled={ !editor.can().chain().focus().undo().run() }
                >
                    Undo
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().redo().run();
                    } }
                    disabled={ !editor.can().chain().focus().redo().run() }
                >
                    Redo
                </button>
                <button
                    onClick={ (e) => {
                        e.preventDefault();
                        editor.chain().focus().setColor("#958DF1").run();
                    } }
                    className={
                        editor.isActive("textStyle", { color: "#958DF1" })
                            ? "text-purple-50 bg-purple-500 rounded-md p-1"
                            : ""
                    }
                >
                    Purple
                </button>
            </div>
        </div>
    );
}