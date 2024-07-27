import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

export default function Modal({ open, onOpenChange, children }) {
    return (
        <Dialog.Root open={ open } onOpenChange={ onOpenChange }>
            { children }
        </Dialog.Root>
    )
}

function ModalContent({ title, children, description = "" }) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay
                className="bg-blackA10  fixed inset-0
      overflow-y-auto
      "
            >
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-sand1  focus:outline-none  flex flex-col ">
                    <Dialog.Close asChild>
                        <button
                            className="text-iris11 hover:bg-iris4 focus:shadow-iris7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] ring-1 ring-iris7 appearance-none items-center justify-center rounded-full focus:ring-1 focus:ring-iris9 focus:outline-none"
                            aria-label="Close"
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                    <div className="w-fullflex-1 h-full bg-sand1 p-4 rounded-[6px] ">
                        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                            { title }
                        </Dialog.Title>
                        { children }
                    </div>
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    )
}

Modal.Trigger = Dialog.Trigger
Modal.Close = Dialog.Close
Modal.Content = ModalContent