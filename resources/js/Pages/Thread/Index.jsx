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
                            <a
                                href={`/threads/${thread.id}`}
                                className="text-blue-500"
                            >
                                Show
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
