import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";

export function ChannelDropdown() {
    const [ isOpen, setIsOpen ] = useState(false);

    const variants = {
        open: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 100 },
        },
        closed: { opacity: 0, scale: 0.95 },
    };

    let {
        props: { channels },
    } = usePage();

    return (
        <div className="relative inline-block ">
            <button
                onFocus={ () => setIsOpen(true) }
                onBlur={ () => setIsOpen(false) }
            >
                <span
                    className="cursor-pointer"
                    onMouseEnter={ () => setIsOpen(true) }
                    onMouseLeave={ () => setIsOpen(false) }
                >
                    channels
                </span>
            </button>
            { isOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={ variants }
                    className="absolute bg-sand-sand1  border border-sand-sand4 rounded-md min-w-[170px] -left-3 top-5 shadow-lg p-4 z-10 "
                    onMouseEnter={ () => setIsOpen(true) }
                    onMouseLeave={ () => setIsOpen(false) }
                >
                    <ul className="flex flex-col gap-2">
                        { channels.map((channel) => (
                            <li key={ channel.slug }>
                                <Link
                                    href={ route("threads.index", channel.slug) }
                                >
                                    { channel.name }
                                </Link>
                            </li>
                        )) }
                    </ul>
                </motion.div>
            ) }
        </div>
    );
}

