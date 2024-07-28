import React, { useCallback, useState } from "react";

import Modal from "@/ui/Model";
import Tooltip from "@/ui/Tooltip";
import { MenuButton } from "@/ui/MenuButton";
import { Cross2Icon, Link1Icon } from "@radix-ui/react-icons"
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";

export function SetLinkForm({ editor }) {
    const [ open, setOpen ] = useState(false);
    const [ url, setUrl ] = useState("");

    function onOpenChange(open) {
        setOpen(open);
    }

    const setLink = useCallback(
        (e) => {
            e.preventDefault();
            const previousUrl = editor.getAttributes("link").href;
            setUrl(previousUrl || "");
            setOpen(true);
        },
        [ editor ]
    );

    const handleSubmit = () => {
        if (url === "")
        {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
        } else
        {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }
        setOpen(false);
    };

    return (
        <>
            <Modal onOpenChange={ onOpenChange } open={ open }>
                <Modal.Trigger asChild>
                    <Tooltip content={ "Link" }>
                        <MenuButton onClick={ setLink } isActive={ editor.isActive("link") }>
                            <Link1Icon />
                        </MenuButton>
                    </Tooltip>
                </Modal.Trigger>
                <Modal.Content
                    open={ open }
                >
                    <article className="flex flex-col  px-2 py-3 ">
                        <section className="flex items-baseline gap-2 px-2 pt-2">
                            <Modal.Title className="text-gray-gray12 m-0 text-[17px] font-semibold">
                                Set Link
                            </Modal.Title>
                            <Modal.Description className="text-gray-gray11 mb-5 text-[15px] leading-normal ">
                                <span>Dialog for setting text's link .</span>
                            </Modal.Description>
                            <Modal.Close asChild>
                                <button
                                    className="text-sand-sand11 
                                    hover:ring-sand-sand9 
                                    focus:shadow-sand-sand7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] ring-1 ring-sand-sand7 appearance-none items-center justify-center rounded-full focus:ring-1 focus:ring-sand-sand9 focus:outline-none mt-2 mr-2
                                    transition ease-in-out duration-150"
                                    aria-label="Close"
                                >
                                    <Cross2Icon />
                                </button>
                            </Modal.Close>
                        </section>
                        <section className="space-y-5 px-2 s">
                            <div className="">
                                <InputLabel htmlFor="link" value="Link" />
                                <TextInput
                                    type="text"
                                    id="link"
                                    value={ url }
                                    onChange={ (e) => setUrl(e.target.value) }
                                    placeholder="e.g. https://example.com"
                                    className="mt-2 -ml-1 block w-full text-sand-sand11"
                                    autoComplete="link"
                                />
                            </div>
                            <div className="flex items-end justify-end gap-5 w-full">
                                <PrimaryButton
                                    onClick={ handleSubmit }>
                                    Submit
                                </PrimaryButton>
                                <Modal.Close
                                    className="ring-offset-2 ring-2
                                 ring-gray-gray7 hover:ring-gray-gray8  inline-flex mr-1
                                border-transparenttext-xs uppercase tracking-widest
                                active:bg-gray-gray7 focus:outline-none focus:ring-2
                                focus:ring-gray-gray10 focus:ring-offset-2 
                                transition ease-in-out duration-150 rounded-lg p-1 bg-gray-gray3  hover:bg-gray-gray4 border border-gray-gray5  justify-center items-center  font-medium text-sand-sand11"
                                >
                                    Cancel
                                </Modal.Close>
                            </div>
                        </section>
                    </article>
                </Modal.Content>
            </Modal>
        </>
    )
}