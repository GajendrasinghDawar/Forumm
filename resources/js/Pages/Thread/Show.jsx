import { Head, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

import Container from "@/Components/Container";
import Dropdown from "@/Components/Dropdown";
import ReplyForm from "@/Components/ReplyForm";
import ReplySection from "@/Components/ReplySection";
import UserLink from "@/Components/UserLink";

export default function Show({ thread }) {
    let { props } = usePage();

    return (
        <>
            <Head title={ thread.data.title } />
            <Container>
                <div className="grid w-full grid-cols-7  grid-flow-col-dense font-inter">
                    <section className="py-2 md:col-span-3 md:col-end-5 col-start-1 col-end-8 mt-2">
                        <div className="flex justify-between items-baseline w-full py-1">
                            <h1 className=" rounded-md">{ thread.data.title }</h1>
                            { props.auth.user && thread.data.can.delete && (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="bg-sand-sand3 hover:bg-sand-sand4 border hover:border-sand-sand4 border-sand-sand5 rounded-full p-1">
                                            <svg
                                                className="h-4 w-4 text-sand-sand9"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Link
                                            as="button"
                                            href={ route("threads.delete", {
                                                thread: thread.data.slug,
                                            }) }
                                            method="delete"
                                            preserveScroll
                                            className="p-1 hover:bg-tomato-tomato3 text-tomato-tomato11 w-full transition duration-150 ease-in-out text-center"
                                        >
                                            Delete thread
                                        </Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            ) }
                        </div>

                        <article className="mt-2 py-2">
                            <p className="">{ thread.data.body }</p>
                        </article>

                        <article className="my-3">
                            { props.auth.user && !(thread.data.locked) ?
                                (
                                    <ReplyForm threadId={ thread.data.slug } />
                                )
                                :
                                <div className="bg-tomato-tomato3 py-3 rounded px-1 border border-tomato-tomato5">
                                    <h3 className="text-red-red11">This thread has been locked. You can't reply to it.</h3>
                                </div>
                            }

                            <h2 className="my-4 font-semibold ">Replies</h2>

                            <ReplySection replies={ thread.data.replies } thread={ thread.data } />
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

                            { props.auth?.user && (
                                <Link
                                    as="button"
                                    href={ route(
                                        "threads.subscribe",
                                        {
                                            thread: thread.data.slug,
                                        }) }
                                    method={ thread.data.isSubscribed ? "delete" : "post" }
                                    preserveScroll
                                    className={ `ml-1 inline-block font-semibold py-2 transition-colors min-w-9 px-2  text-xs rounded ${thread.data.isSubscribed ? 'text-sand-sand1  bg-jade-jade10 hover:bg-jade-jade9' : 'bg-sand-sand6'}` }
                                >
                                    { thread.data.isSubscribed ? "unsubscribe" : "subscribe" }
                                </Link>) }

                            { props.auth?.user && props.auth?.user.is_admin && (
                                <Link
                                    as="button"
                                    href={ route(
                                        "admin",
                                        {
                                            thread: thread.data.slug,
                                        }) }
                                    method={ thread.data.locked ? "delete" : "post" }
                                    preserveScroll
                                    className={ `ml-3 inline-block font-semibold py-2 transition-colors w-min h-min px-2  text-xs rounded min-w-14 bg-sand-sand6 text-sand-sand12` }
                                >
                                    { thread.data.locked ? "unlock" : "lock" }
                                </Link>
                            ) }

                        </div>
                    </section>
                </div >
            </Container>
        </>
    );
}


