import { Link } from "@inertiajs/react";

export default function UserLink({ username }) {
    return (
        <Link href={ route("profile.show", username) } className="mx-1">
            { `@${username}` }
        </Link>
    )
}