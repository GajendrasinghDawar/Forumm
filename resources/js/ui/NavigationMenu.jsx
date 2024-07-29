import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { CaretDownIcon } from '@/ui/Icons';
import { Link } from "@inertiajs/react";

const NavigationMenuContext = createContext();

function NavigationMenu({ children }) {
    const [ isOpen, setIsOpen ] = useState(false);
    const menuRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ')
        {
            event.preventDefault();
            handleToggle();
        }
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target))
        {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <NavigationMenuContext.Provider value={ { isOpen, handleToggle, handleKeyDown, handleLinkClick, handleMouseEnter, handleMouseLeave } }>
            <section className="relative max-w-fit group" ref={ menuRef }>
                { children }
            </section>
        </NavigationMenuContext.Provider>
    );
}

function NavigationMenuTrigger({ title }) {
    const { isOpen, handleToggle, handleKeyDown, handleMouseEnter, handleMouseLeave } = useContext(NavigationMenuContext);

    const buttonProps = {
        'aria-haspopup': 'true',
        'aria-expanded': isOpen,
        onClick: handleToggle,
        onKeyDown: handleKeyDown,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
    };


    return (
        <button { ...buttonProps }
            className='flex justify-between p-1 gap-3 min-w-fit mx-2 px-3 '>
            <span className='inline-block'>
                { title }
            </span>
            <CaretDownIcon />
        </button>
    );
}

function NavigationMenuList({ children }) {
    const { isOpen, handleMouseEnter, handleMouseLeave } = useContext(NavigationMenuContext);

    return (
        <ul
            className={ `absolute right-0 left-2 top-7  transition-all duration-300 ease-in-out   w-[150px] mt-2 p-4 rounded-lg font-medium text-base border-gray-200  border  max-h-fit 
            bg-gray-100 flex flex-col gap-3 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
            ` }
            onMouseEnter={ handleMouseEnter }
            onMouseLeave={ handleMouseLeave }
        >
            { children }
        </ul>
    );
}

function NavigationMenuItem({ href, children }) {
    const { handleLinkClick } = useContext(NavigationMenuContext);

    return (
        <li className='focus:border focus:border-gray-800 min-w-fit'>
            <Link href={ href } className="w-full no-underline h-full block" onClick={ handleLinkClick } tabIndex={ 0 } role="menuitem">
                { children }
            </Link>
        </li>
    );
}



export { NavigationMenu, NavigationMenuTrigger, NavigationMenuList, NavigationMenuItem };