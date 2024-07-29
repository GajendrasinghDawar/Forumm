import { Link } from "@inertiajs/react";

export function MobileNavLink({ href, onClick, children, className }) {
    // const handleClick = () => {
    //     setTimeout(() => {
    //         if (onClick) onClick();
    //     }, 300);
    // };

    return (
        <Link
            className={ `no-underline ` + className }
            href={ href }
            onClick={ onClick }
        >
            { children }
        </Link>
    )
}