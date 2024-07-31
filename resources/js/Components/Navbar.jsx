import { Link } from "@inertiajs/react";

import Notifications from "@/Components/Notification";
import { PlusIcon } from "@/ui/Icons";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { UserDropDown } from "@/Components/UserDropDown";
import { BrowseDropdown } from "@/Components/BrowseDropdown";
import { ChannelDropdown } from "@/Components/ChannelDropdown";


export function NavBar({ user }) {
    return (
        <header
            className="bg-sand-sand2 border-b
         border-sand-sand5 sticky top-0 z-10 backdrop-blur-lg bg-opacity-50 "
        >
            <nav className="md:max-w-7xl md:mx-auto px-4 sm:px-6 lg:px-8 ml-auto h-16 w-full flex justify-between md:grid  md:grid-cols-7  md:grid-flow-col-dense">
                <section className="md:col-start-2 md:col-end-5  flex items-center">
                    <div className="-ml-1 md:p-0 shrink-0 flex items-center">
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-9 md:h-10 md:w-10  fill-current text-gray-gray12" />
                        </Link>
                    </div>
                    <div className="space-x-8 sm:-my-px sm:ms-10 hidden md:flex md:items-baseline">
                        <BrowseDropdown />
                        <ChannelDropdown />
                    </div>
                </section>

                <section className="md:col-start-7  md:col-end-8 sm:flex sm:items-center  ">
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
                </section>
            </nav>
        </header>
    );
}
