import Container from "@/Components/Container";
import Dropdown from "@/Components/Dropdown";
import ReplyForm from "@/Components/ReplyForm";
import UserLink from "@/Components/UserLink";
import { Head, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

export default function Show({ thread }) {
    let { props } = usePage();

    return (
        <>
            <Head title={ thread.data.title } />
            <Container><div className="grid w-full grid-cols-7  grid-flow-col-dense font-inter">
                <section className="py-2 md:col-span-3 md:col-end-5 col-start-1 col-end-8 mt-2">
                    <div className="flex justify-between items-baseline w-full py-1">
                    <h1 className=" rounded-md">{ thread.data.title }</h1>
                        { props.auth.user && thread.data.can.delete && (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button>
                                        <svg
                                            className="h-4 w-4 text-gray-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <DeleteForm threadId={ thread.data.id } />

                                </Dropdown.Content>
                            </Dropdown>
                        ) }
                    </div>
                    <p className="mt-4">{ thread.data.body }</p><article>
                        <h2 className="my-4 font-semibold ">Replies</h2>
                        { props.auth.user && (
                            <ReplyForm threadId={ thread.data.id } />
                        ) }
                        { thread.data.replies?.map((reply) => (
                            <div
                                key={ reply.id }
                                className="bg-gray-100 my-4 p-2 border border-sand-sand4 rounded-md space-y-2"
                            ><section className="flex justify-between items-center  py-1 ">
                                    <p>
                                        <span> replied by</span>

                                        <UserLink name={ reply.user.name } />
                                        <span> { reply.created_at }</span>
                                    </p>
                                    <div>

                                        { props.auth?.user && (<Link
                                            as="button"
                                            href={
                                                route(
                                                    "replies.favorite",
                                                    {
                                                        reply: reply.id,
                                                    }
                                                ) }
                                            method="post"
                                            preserveScroll
                                            className="ml-1 inline-block bg-sand-sand5 hover:bg-sand-sand6 transition-colors  py-1 w-min h-min px-2  text-xs rounded"
                                            disabled={
                                                reply.isFavorited
                                                    ? true
                                                    : false
                                            }
                                        > <span className="mx-1 ">
                                                { reply.favorites_count }
                                            </span>
                                            Favorite
                                        </Link>
                                        ) }
                                    </div>
                                </section>
                                <p>{ reply.body }</p>
                            </div>
                        )) }
                    </article>
                </section >
                <section className="hidden md:block bg-gray-100 border border-sand-sand4  mt-2  h-[250px] z-0	w-70 rounded-md  sticky top-20 col-start-6  col-end-8">
                    <div className="w-full min-h-full  p-2 space-y-2">
                        <p>
                            This thread was published{ " " }
                            { thread.data.created_at } by
                            <UserLink name={ thread.data.author }>
                                { thread.data.author }
                            </UserLink>
                        </p>
                        <p>
                            It has currently has { thread.data.replies_count }{ " " }
                            comments.
                        </p>
                    </div>
                </section>
            </div >
            </Container>
        </>
    );
}



function DeleteForm({ threadId }) {
    const { data, setData, reset, processing, errors, delete: destroy } = useForm({
        body: "",
    });

    function submit(e) {
        e.preventDefault();
        destroy(
            route("threads.delete", {
                thread: threadId,
            }),
            {
                preserveScroll: true,
                onSuccess: () => reset("body"),
            }
        );
    }

    return (
        <form onSubmit={ submit }>
            <button className="p-1 hover:bg-tomato-tomato3 text-tomato-tomato11 w-full">Delete thread</button>
        </form>
    )
}