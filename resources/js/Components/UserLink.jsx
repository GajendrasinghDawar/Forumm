import { Link } from "@inertiajs/react";

export default function UserLink({ className, username }) {
    return (
        <Link
            className={ `mx-1 ${className}` }
            href={ route("profile.show", username) }
        >
            { `@${username}` }
        </Link>
    )
}