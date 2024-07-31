import { useState } from "react";
import { NavBar } from "@/Components/Navbar";
import MobileNavBar from "@/Components/MobileNavBar";

export default function Authenticated({ user, children }) {
    const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false);
    return (
        <div className="flex flex-col h-full w-full">
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
        </div>
    );
}



