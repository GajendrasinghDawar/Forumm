import Container from "@/Components/Container";
import Dropdown from "@/Components/Dropdown";
import ReplyForm from "@/Components/ReplyForm";
import ReplySection from "@/Components/ReplySection";
import UserLink from "@/Components/UserLink";
import { Head, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

export default function Show({ thread }) {
    let { props } = usePage();
    const { data, setData, reset, processing, errors, delete: destroy } = useForm({
        body: "",
    });

    function submit(e) {
        e.preventDefault();
        destroy(
            route("threads.delete", {
                thread: thread.data.slug,
            }),
            {
                preserveScroll: true,
            }
        );
    }

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
                                        <form onSubmit={ submit }>
                                            <button className="p-1 hover:bg-tomato-tomato3 text-tomato-tomato11 w-full">Delete thread</button>
                                        </form>
                                    </Dropdown.Content>
                                </Dropdown>
                            ) }
                        </div>
                        <p className="mt-4">{ thread.data.body }</p><article>
                            <h2 className="my-4 font-semibold ">Replies</h2>
                            { props.auth.user && (
                                <ReplyForm threadId={ thread.data.slug } />
                            ) }
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
                                    className={ `ml-1 inline-block font-semibold py-2 transition-colors w-min h-min px-2  text-xs rounded ${thread.data.isSubscribed ? 'text-sand-sand1  bg-jade-jade10 hover:bg-jade-jade9' : 'bg-sand-sand6'}` }
                                >
                                    { thread.data.isSubscribed ? "unsubscribe" : "subscribe" }
                                </Link>) }

                        </div>
                    </section>
                </div >
            </Container>
        </>
    );
}


