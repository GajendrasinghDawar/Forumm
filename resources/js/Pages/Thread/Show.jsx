import Container from "@/Components/Container";
import ReplyForm from "@/Components/ReplyForm";
import { Head, usePage } from "@inertiajs/react";

export default function Show({ thread, replies }) {
    let props = usePage();

    return (
        <>
            <Head title={thread.data.title} />
            <Container>
                <div className="grid w-full grid-cols-7  grid-flow-col-dense">
                    <section className="py-2 col-span-3 col-end-5 ">
                        <h1 className="bg-gray-100 rounded-md">
                            {thread.data.title}
                        </h1>
                        <p className="mt-4">{thread.data.body}</p>
                        <article>
                            <h2 className="my-4 font-semibold ">Replies</h2>
                            {props.props.auth.user && (
                                <ReplyForm threadId={thread.data.id} />
                            )}
                            {replies.data.map((reply) => (
                                <div
                                    key={reply.id}
                                    className="bg-gray-100 my-4 p-2 border border-gray-500 rounded-md"
                                >
                                    <p>
                                        replied by
                                        <a href="#">
                                            <span className="mx-1 font-semibold">
                                                {reply.user.name}
                                            </span>{" "}
                                        </a>
                                        <span className="text-gray-500">
                                            {" "}
                                            {reply.created_at}
                                        </span>
                                    </p>
                                    <p>{reply.body}</p>
                                </div>
                            ))}
                        </article>
                    </section>
                    <section className="py-2  w-70 max-h-[250px] sticky top-16 col-start-6  col-end-8">
                        <div className="w-full h-full bg-gray-100 p-2 border border-gray-500 rounded-md">
                            <h2 className="my-4 font-semibold ">
                                Create Reply
                            </h2>
                        </div>
                    </section>
                </div>
            </Container>
        </>
    );
}
