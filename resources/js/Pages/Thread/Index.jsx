import Container from "@/Components/Container";
import { Link } from "@inertiajs/react";

export default function Index({ threads }) {
    return (
        <Container>
            <ul className="h-full w-full py-2 px-4">
                {threads.data.map((thread) => (
                    <li
                        key={thread.id}
                        className="my-2 bg-gray-100 p-2 rounded-md border border-gray-600 flex items-center justify-between"
                    >
                        <div>
                            <p className="font-medium">{thread.title}</p>
                            <p className="text-sm">{thread.created_at}</p>
                            <p className="text-clip">{thread.body}</p>
                            <Link
                                href={route("threads.show", thread.id)}
                                className="text-blue-500"
                            >
                                more detail...
                            </Link>
                        </div>

                        <div className="flex justify-end"></div>
                    </li>
                ))}
            </ul>
        </Container>
    );
}
