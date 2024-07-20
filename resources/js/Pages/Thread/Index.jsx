import Container from "@/Components/Container";
import { Link, Head } from "@inertiajs/react";

export default function Index({ threads }) {
    return (
        <Container>
            <Head>
                <title>All Threads</title>
            </Head>
            <div className="grid w-full grid-cols-7  grid-flow-col-dense font-inter">
                <ul className="md:col-start-3 col-span-8 md:col-end-6 mt-2 h-full w-full py-2 px-4 md:col-span-3">
                {threads.data.map((thread) => (
                    <li
                        key={thread.id}
                        className="bg-gray-100 my-4 p-2 border border-sand-sand5 rounded-md space-y-2"
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
            </div>

        </Container>
    );
}
