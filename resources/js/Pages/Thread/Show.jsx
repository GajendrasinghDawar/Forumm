import { Head, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

import Container from "@/Components/Container";
import Dropdown from "@/Components/Dropdown";
import ReplyForm from "@/Components/ReplyForm";
import ReplySection from "@/Components/ReplySection";
import DOMPurify from 'dompurify';

import { ErrorBoundary } from "react-error-boundary";
import UserLink from "@/Components/UserLink";

export default function Show({ thread }) {
    let { props } = usePage();
    const cleanedHTML = DOMPurify.sanitize(thread.data.body);

    return (
        <>
            <Head title={ thread.data.title } />
            <ErrorBoundary fallback={ <div>Something went wrong</div> }>
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
                                                className="p-1 hover:bg-tomato-tomato3 text-tomato-tomato11 w-full transition duration-150 ease-in-out text-center text-sm font-medium"
                                            >
                                                Delete thread
                                            </Link>

                                            <Link
                                                as="button"
                                                href={ route("threads.create", {
                                                    thread: thread.data.slug,
                                                }) }
                                                method="get"
                                                className="p-1 hover:bg-iris-iris3 text-iris-iris11 w-full transition duration-150 ease-in-out text-center text-sm font-medium"
                                            >
                                                Edit thread
                                            </Link>

                                        </Dropdown.Content>
                                    </Dropdown>
                                ) }
                            </div>

                            <article className="" dangerouslySetInnerHTML={ { __html: cleanedHTML } }>
                            </article>

                            <article className="my-3">
                                { !props.auth.user && (
                                    <div className="bg-tomato-tomato3 py-3 rounded px-1 border border-tomato-tomato5">
                                        <p className="text-red-red11">You must be
                                            <Link
                                                href={ route("login") }
                                                className="ml-2 mx-1"
                                            >
                                                logged in
                                            </Link>  or  <Link
                                                href={ route("register") }
                                                className="mx-1"
                                            >
                                                create account
                                            </Link>  to reply to this thread.
                                        </p>
                                    </div>

                                ) }
                                { props.auth.user && !(thread.data.locked) && (<ReplyForm threadId={ thread.data.slug } />)
                                }

                                {
                                    props.auth.user && thread.data.locked && (
                                        <div className="bg-tomato-tomato3 py-3 rounded px-1 border border-tomato-tomato5">
                                            <h3 className="text-red-red11">This thread has been locked. You can't reply to it.</h3>
                                        </div>
                                    )
                                }
                                <h2 className="my-4 font-semibold ">Replies</h2>

                                <ReplySection replies={ thread.data.replies } thread={ thread.data } />
                            </article>

                        </section >
                        <section className="hidden md:block bg-gray-100 border border-sand-sand4  mt-2  h-[250px] z-0	w-70 rounded-md  sticky top-20 col-start-6  col-end-8">

                            <div
                                className="w-full min-h-full  p-2 space-y-2 flex flex-col justify-between"
                            >
                                <div>

                                    <p>
                                        This thread was published{ " " }
                                        { thread.data.created_at } by
                                        <UserLink username={ thread.data.author }>
                                            { thread.data.author }
                                        </UserLink>
                                    </p>
                                    <p>
                                        It has currently has { thread.data.replies_count }{ " " }
                                        comments.
                                    </p>

                                </div>
                                <div>
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


                                            className={ `ml-1 inline-block text-sand-sand11 font-medium  transition-colors  py-2 w-min h-min px-2  text-xs rounded ${thread.data.isSubscribed ? 'text-sand-sand3  bg-grass-grass10 hover:bg-grass-grass9  ' : 'bg-sand-sand6'}` }
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
                                            className={ `ml-1 inline-block text-sand-sand11 font-medium  transition-colors  py-2 w-min h-min px-2  text-xs rounded ${thread.data.locked ? 'text-sand-sand3  bg-tomato-tomato10 hover:bg-tomato-tomato9 ' : 'bg-sand-sand6'}` }
                                        >
                                            { thread.data.locked ? "unlock" : "lock" }
                                        </Link>
                                    ) }
                                </div>

                            </div>
                        </section>
                    </div >
                </Container>
            </ErrorBoundary>
        </>
    );
}


