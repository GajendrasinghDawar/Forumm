import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";
import { createPortal } from "react-dom";

import { MobileNavLink } from "@/Components/MobileNavLink";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function MobileNavBar({ user, isOpen, onClose }) {
    let {
        props: { channels },
    } = usePage();

    const [ isClient, setIsClient ] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient)
    {
        return null;
    }

    return createPortal(
        <AnimatePresence>
            { isOpen ? (
                <motion.div
                    key="nav-bar-main-container"
                    initial={ { opacity: 0, x: -50 } }
                    animate={ { opacity: 1, x: 0 } }
                    exit={ {
                        opacity: 0, x: -50,
                    } }

                    className="fixed inset-0 z-20 bg-sand-sand2 w-full h-screen flex flex-col items-center justify-center"
                >
                    <motion.nav
                        initial={ { opacity: 0, } }
                        animate={ { opacity: 1, } }
                        className={ `
                            absolute top-0 flex w-full justify-between items-center min-h-12 bg-sand-sand2 border-b
                            border-sand-sand5  
                            backdrop-blur-lg bg-opacity-50 px-3 py-2
                        `}
                    >
                        <div className="px-2 md:p-0 shrink-0 flex items-center ">
                            <Link href="/" onClick={ onClose }>
                                <ApplicationLogo className="block h-9 w-9 fill-current text-gray-gray12" />
                            </Link>
                        </div>
                        <button
                            onClick={ onClose }
                            className="rounded-lg p-1 bg-gray-gray3 hover:bg-gray-gray4 border border-gray-gray5 flex justify-center items-center min-w-6 min-h-6"
                        >
                            <svg
                                className="h-5 w-5 stroke-gray-gray9 fill-slate-700"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </motion.nav>

                    <motion.div
                        initial={ { opacity: 0, } }
                        animate={ { opacity: 1, } }
                        className="space-y-6 text-center text-white"
                    >
                        <div className="w-full p-2">
                            <h2 className="-ml-2">Browse</h2>
                            <div className="flex flex-col ml-8">
                                { user && (
                                    <MobileNavLink
                                        href={ route("threads.index", {
                                            _query: {
                                                by: user.name,
                                            },
                                        }) }
                                        onClick={ onClose }
                                    >
                                        My threads
                                    </MobileNavLink>
                                ) }
                                <MobileNavLink
                                    href={ route("threads.index") }
                                    onClick={ onClose }
                                >
                                    All Threads
                                </MobileNavLink>
                                <MobileNavLink
                                    href={ route("threads.index", {
                                        _query: {
                                            popular: 1,
                                        },
                                    }) }
                                    onClick={ onClose }
                                >
                                    Popular threads
                                </MobileNavLink>
                                <MobileNavLink
                                    href={ route("threads.index", {
                                        _query: {
                                            unanswered: 1,
                                        },
                                    }) }
                                    onClick={ onClose }
                                >
                                    Unanswered
                                </MobileNavLink>
                            </div>
                        </div>
                        <div className="">
                            <h2 className="-ml-2">Channels</h2>
                            <ul className="flex flex-col ml-8">
                                { channels.map((channel) => (
                                    <MobileNavLink
                                        key={ channel.slug }
                                        href={ route("threads.index", channel.slug) }
                                        onClick={ onClose }
                                    >
                                        { channel.name }
                                    </MobileNavLink>
                                )) }
                            </ul>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null }
        </AnimatePresence>,
        document.getElementById("mobile-nav-portal")
    );
}