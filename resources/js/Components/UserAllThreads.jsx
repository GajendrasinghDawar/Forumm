import { Link } from "@inertiajs/react";

export function Thread({ threads }) {

    return (
        <ul className="w-full space-y-3">
            {
                !(threads.length > 0) && (
                    <div className="bg-gray-100 my-4 p-2 border border-sand-sand5 rounded-md space-y-2">
                        <h2>No threads now!</h2>
                        <p>User created no thread.</p>
                    </div>
                )
            }
            { threads.map((thread) => (
                <Link key={ thread.id } className="my-4 no-underline group">
                    <li
                        className="bg-gray-100 px-2 py-3 border border-sand-sand4 rounded-md space-y-2 w-full h-full"
                    >
                        <div className="w-full flex py-1">
                            <h4 className="inline-block group-hover:underline">{ thread.title }</h4>
                            <span className="ml-auto text-xs inline-block">
                                { thread.created_at }
                            </span>
                        </div>
                        <div className="truncate" dangerouslySetInnerHTML={ { __html: thread.body } }>
                        </div>
                    </li>
                </Link>
            )) }
        </ul>

    )
}