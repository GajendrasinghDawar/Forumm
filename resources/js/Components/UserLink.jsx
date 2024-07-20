import { Link } from "@inertiajs/react";

export default function UserLink({ children, name }) {
    return (
        <Link href={ route("profile.show", name) } className="mx-1">
            { `@${name}` }
        </Link>
    )
}