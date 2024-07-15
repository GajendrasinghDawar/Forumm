import Container from "@/Components/Container";
import { Link } from "@inertiajs/react";

export default function Show({ user }) {
    let { data } = user;
    return (
        <Container>
            <div className="md:grid md:grid-cols-5">
                <div className="space-y-1 my-3 md:col-start-2 md:col-span-3 py-2">
                    <h1 className="text-2xl">{ data.name }</h1>
                    <p>{ data.email }</p>
                    <p>Joined <span>{ data.created_at }</span></p>
                </div>
                <ul className="h-full w-full py-2  md:col-start-2 md:col-span-3">
                    { data.threads.map((thread) => (
                        <li
                            key={ thread.id }
                            className="bg-gray-100 my-4 p-2 border border-sand-sand4 rounded-md space-y-2"
                        >
                            <h4>{ thread.title }</h4>
                            <span className="text-xs ">
                                { thread?.author } - { thread.created_at }
                            </span>
                            <p className="truncate ">{ thread.body }</p>

                            <div className="flex justify-between space-x-2 items-baseline">
                                <Link href={ thread.route }>more detail...</Link>

                                <button className="bg-sand-sand4 py-2 rounded-3xl px-2 font-medium text-sm border border-sand-sand5">
                                    { thread.replies_count } replies
                                </button>
                            </div>
                        </li>
                    )) }
                </ul>
            </div>
        </Container>
    );
}