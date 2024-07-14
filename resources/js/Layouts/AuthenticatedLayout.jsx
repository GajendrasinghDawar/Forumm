import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";

export default function Authenticated({ user, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar user={user} />
            <main>{children}</main>
        </div>
    );
}

function NavBar({ user }) {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 text-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>

                        <div className=" space-x-8 sm:-my-px sm:ms-10 flex items-baseline ml-3">
                            <BrowseDropdown />

                            {user && (
                                <Link href={route("threads.create")}>
                                    New threads
                                </Link>
                            )}
                            <ChannelDropdown />
                        </div>
                    </div>

                    <div className=" sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 relative flex items-center text-gray-700 h-full">
                            {user ? (
                                <UserDropDown user={user} />
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="rounded-md px-3 py-2 text-gray-700 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:text-gray-700"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="rounded-md px-3 py-2 text-gray-700 ring-1 ring-transparent transition hover:text-gray-800/70 focus:outline-none focus-visible:text-gray-700"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function UserDropDown({ user }) {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                        {user?.name}

                        <svg
                            className="ms-2 -me-0.5 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </span>
            </Dropdown.Trigger>

            <Dropdown.Content>
                <Dropdown.Link href={route("profile.edit")}>
                    Profile
                </Dropdown.Link>
                <Dropdown.Link href={route("logout")} method="post" as="button">
                    Log Out
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    );
}

function ChannelDropdown() {
    const [isOpen, setIsOpen] = useState(false);

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
        <div className="relative inline-block text-gray-600">
            <span
                className="cursor-pointer"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                channels
            </span>
            {isOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={variants}
                    className="absolute bg-gray-100 rounded-md min-w-[170px] shadow-lg p-4 z-10 "
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <ul className="flex flex-col gap-2">
                        {channels.map((channel) => (
                            <li key={channel.slug}>
                                <Link
                                    href={route("threads.index", channel.slug)}
                                    className="hover:underline"
                                >
                                    {channel.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
}

function BrowseDropdown({}) {
    const [isOpen, setIsOpen] = useState(false);
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
        <div className="relative inline-block text-gray-600">
            <span
                className="cursor-pointer"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                Browse
            </span>
            {isOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={variants}
                    className="absolute bg-gray-100 rounded-md min-w-[170px] shadow-lg p-4 z-10 flex flex-col gap-2"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    {user && (
                        <>
                            <Link href={route("dashboard")}>Dashboard</Link>
                            <Link
                                href={route("threads.index", {
                                    _query: {
                                        by: user.name,
                                    },
                                })}
                            >
                                My threads
                            </Link>
                        </>
                    )}

                    <Link href={route("threads.index")}>All Threads</Link>
                </motion.div>
            )}
        </div>
    );
}