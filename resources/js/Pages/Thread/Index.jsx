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
                        <p className="truncate ">{thread.body}</p>

                        <div className="flex justify-between space-x-2 items-baseline">
                            <Link href={thread.route}>more detail...</Link>

                            <button className="bg-sand-sand4 py-2 rounded-3xl px-2 font-medium text-sm border border-sand-sand5">
                                {thread.replies_count} replies
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </Container>
    );
}
