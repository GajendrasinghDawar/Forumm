import { Link } from "@inertiajs/react";

import Notifications from "@/Components/Notification";
import { PlusIcon } from "@/ui/Icons";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { UserDropDown } from "@/Components/UserDropDown";
import { BrowseDropdown } from "@/Components/BrowseDropdown";
import { ChannelDropdown } from "@/Components/ChannelDropdown";
import { useState } from "react";
import MobileNavBar from "@/Components/MobileNavBar";

export default function Authenticated({ user, children }) {
    const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false);
    return (
        <>
            <NavBar user={ user } />
            <main>
                { children }
            </main>

            <aside className="fixed bottom-7 left-4 bg-sand-sand6 rounded-lg flex md:hidden">
                <button
                    onClick={ () => setIsMobileMenuOpen(!isMobileMenuOpen) }
                    className="rounded-lg p-1 bg-gray-gray3  hover:bg-gray-gray4 border border-gray-gray5 flex justify-center items-center min-w-6 min-h-6"
                >
                    <svg className="h-6 w-6 stroke-gray-gray9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        { isMobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        ) }
                    </svg>
                </button>
                <MobileNavBar user={ user } isOpen={ isMobileMenuOpen } onClose={ () => setIsMobileMenuOpen(false) } />
            </aside>
        </>
    );
}

function NavBar({ user }) {
    return (
        <header
            className="bg-sand-sand2 border-b
         border-sand-sand5 sticky top-0 z-10 backdrop-blur-lg bg-opacity-50"
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="ml-auto max-w-5xl flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="px-2 md:p-0 shrink-0 flex items-center ">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-9  fill-current text-gray-gray12" />
                            </Link>
                        </div>

                        <div className=" hidden space-x-8 sm:-my-px sm:ms-10 md:flex items-baseline">
                            <BrowseDropdown />
                            <ChannelDropdown />
                        </div>

                    </div>

                    <div className=" sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 relative flex items-center  h-full">
                            { user && !(user.email_verified_at === null) && (
                                <>
                                    <Link
                                        as="button"
                                        href={ route("threads.create") }
                                        className={ `rounded-lg p-1 bg-gray-gray3  hover:bg-gray-gray4 border border-gray-gray5 inline-flex justify-center items-center  font-medium text-sand-sand11 min-w-8 min-h-[30px]` }
                                    >
                                        <PlusIcon />
                                        <span className="ml-1">Create</span>
                                    </Link>
                                    <Notifications user={ user } />
                                </>
                            ) }

                            { user ? (
                                <div className="flex gap-2 items-baseline">

                                    <UserDropDown user={ user } />
                                </div>
                            ) : (
                                <>
                                        <Link
                                            href={ route("login") }
                                            className="rounded-md px-3 py-2 ring-1 ring-transparent transition "
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                            href={ route("register") }
                                        className="rounded-md px-3 py-2 ring-1 ring-transparent transition "
                                    >
                                        Register
                                    </Link>
                                </>
                            ) }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}


