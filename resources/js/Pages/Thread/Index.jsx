import Container from "@/Components/Container";
import { Link, Head } from "@inertiajs/react";

export default function Index({ threads, trending_threads }) {
    return (
        <Container>
            <Head>
                <title>All Threads</title>
            </Head>
            <div className="grid w-full grid-cols-7  grid-flow-col-dense font-inter">
                <section className="py-2 md:col-span-3 md:col-end-5 col-start-1 col-end-8 mt-2">
                    { threads.data.length === 0 && (
                        <NoThreads />
                    ) }
                    <ul className="mt-2 h-full w-full py-2 px-4 ">
                        { threads.data.map((thread) => (
                            <li
                                key={ thread.id }
                                className="bg-gray-100 my-4 p-2 border border-sand-sand5 rounded-md space-y-2"
                            >
                                <h4>{ thread.title }</h4>
                                <span className="text-xs ">
                                    { thread?.author } - { thread.created_at }
                                </span>
                                <p className="truncate ">{ thread.body }</p>
                                <div className="flex justify-between space-x-2 items-baseline">
                                    <Link href={ thread.route }>more detail...</Link>
                                    <span>{ thread.visits } views</span>
                                    <button className="bg-sand-sand4 py-2 rounded-3xl px-2 font-medium text-sm border border-sand-sand5">
                                        { thread.replies_count } replies
                                    </button>

                                </div>
                            </li>
                        )) }
                    </ul>
                </section>
                <section className="hidden md:block bg-gray-100 border border-sand-sand4  mt-2  h-[250px] z-0	w-70 rounded-md  sticky top-20 col-start-6  col-end-8">
                    <div className="w-full min-h-full  p-2 space-y-2 ">
                        <h3>Trending threads</h3>
                        <ul className="px-1 space-y-2">
                            { trending_threads.map((thread) => (<li>
                                <Link href={ thread.path }>{ thread.title }</Link>
                            </li>)) }
                        </ul>
                    </div>
                </section>
            </div>
        </Container>
    );
}

function NoThreads() {
    return (
        <div className="bg-gray-100 my-4 p-2 border border-sand-sand5 rounded-md space-y-2">
            <h2>No threads now!</h2>
            <p>Try changing channels or try searching other threads e.g. unanswered threads. </p>
        </div>
    );
}