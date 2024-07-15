import Container from "@/Components/Container";
import ReplyForm from "@/Components/ReplyForm";
import { Head, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

export default function Show({ thread }) {
    let { props } = usePage();

    return (
        <>
            <Head title={thread.data.title} />
            <Container>
                <div className="grid w-full grid-cols-7  grid-flow-col-dense font-inter">
                    <section className="py-2 md:col-span-3 md:col-end-5 sm:col-start-1 sm:col-end-8">
                        <h1 className=" rounded-md">{thread.data.title}</h1>
                        <p className="mt-4">{thread.data.body}</p>
                        <article>
                            <h2 className="my-4 font-semibold ">Replies</h2>
                            {props.auth.user && (
                                <ReplyForm threadId={thread.data.id} />
                            )}
                            {thread.data.replies?.map((reply) => (
                                <div
                                    key={reply.id}
                                    className="bg-gray-100 my-4 p-2 border border-sand-sand4 rounded-md space-y-2"
                                >
                                    <section className="flex justify-between items-center  py-1 ">
                                        <p>
                                            <span> replied by</span>
                                            <a href="#" className="mx-1">
                                                {reply.user?.name}
                                            </a>
                                            <span> {reply.created_at}</span>
                                        </p>
                                        <div>
                                            <span>
                                                Favorites{" "}
                                                {reply.favorites_count}
                                            </span>
                                            {props.auth?.user && (
                                                <Link
                                                    as="button"
                                                    href={route(
                                                        "replies.favorite",
                                                        {
                                                            reply: reply.id,
                                                        }
                                                    )}
                                                    method="post"
                                                    preserveScroll
                                                    className="ml-1 inline-block bg-sand-sand5 hover:bg-sand-sand6 transition-colors  py-1 w-min h-min px-2  text-xs rounded"
                                                    disabled={
                                                        reply.isFavorited
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    Favorite
                                                </Link>
                                            )}
                                        </div>
                                    </section>
                                    <p>{reply.body}</p>
                                </div>
                            ))}
                        </article>
                    </section>
                    <section className="sm:hidden md:block bg-gray-100 border border-sand-sand4  mt-2  h-[250px] z-0	w-70 rounded-md  sticky top-20 col-start-6  col-end-8">
                        <div className="w-full min-h-full  p-2 space-y-2">
                            <p>
                                This thread was published{" "}
                                {thread.data.created_at} by
                                <a href="#" className="mx-1">
                                    {thread.data.author}
                                </a>
                            </p>
                            <p>
                                It has currently has {thread.data.replies_count}{" "}
                                comments.
                            </p>
                        </div>
                    </section>
                </div>
            </Container>
        </>
    );
}


