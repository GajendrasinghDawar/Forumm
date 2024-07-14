import Container from "@/Components/Container";
import { Link } from "@inertiajs/react";

export default function Index({ threads }) {
    return (
        <Container>
            <ul className="h-full w-full py-2 px-4">
                {threads.data.map((thread) => (
                    <li
                        key={thread.id}
                        className="bg-gray-100 my-4 p-2 border border-sand-sand4 rounded-md space-y-2"
                    >
                        <h4>{thread.title}</h4>
                        <span className="text-xs ">
                            {thread?.author} - {thread.created_at}
                        </span>
                        <p>{thread.body}</p>
                        <Link href={thread.route}>more detail...</Link>
                    </li>
                ))}
            </ul>
        </Container>
    );
}
