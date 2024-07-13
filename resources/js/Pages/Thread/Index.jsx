import { Link } from "@inertiajs/react";

export default function Index({ threads }) {
    return (
        <div>
            <h1>Thread Index</h1>
            <ul className="h-full w-full py-2 px-4">
                {threads.map((thread) => (
                    <li
                        key={thread.id}
                        className="my-2 bg-gray-100 p-2 rounded-md"
                    >
                        {thread.title}

                        <div className="flex justify-end">
                            <Link
                                href={route("threads.show", thread.id)}
                                className="text-blue-500"
                            >
                                Show
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
