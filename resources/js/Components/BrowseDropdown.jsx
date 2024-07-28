import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";

export function BrowseDropdown() {
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
        props: {
            auth: { user },
        },
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
                    Browse
                </span>
            </button>

            { isOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={ variants }
                    className="absolute bg-sand-sand1  border border-sand-sand4 rounded-md min-w-[170px] -left-3 top-5 shadow-lg p-4 z-10 flex flex-col gap-2"
                    onMouseEnter={ () => setIsOpen(true) }
                    onMouseLeave={ () => setIsOpen(false) }
                >
                    { user && (
                        <>
                            <Link
                                href={ route("threads.index", {
                                    _query: {
                                        by: user.name,
                                    },
                                }) }
                            >
                                My threads
                            </Link>
                        </>
                    ) }

                    <Link href={ route("threads.index") }>All Threads</Link>
                    <Link
                        href={ route("threads.index", {
                            _query: {
                                popular: 1,
                            },
                        }) }
                    >
                        Popular threads
                    </Link>

                    <Link
                        href={ route("threads.index", {
                            _query: {
                                unanswered: 1,
                            },
                        }) }
                    >
                        Unanswered
                    </Link>

                </motion.div>
            ) }
        </div>
    );
}
