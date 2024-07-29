import { Link } from "@inertiajs/react";

export function MobileNavLink({ href, onClick, children, className }) {

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