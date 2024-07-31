import Container from "@/Components/Container";
import { Link, Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/ui/SecondaryButton";
import { Avatar } from "@/ui/Avatar";
import { ReplyCountIcon, ViewsCountIcon } from "@/ui/Icons";
import Tooltip from "@/ui/Tooltip";
import UserLink from "@/Components/UserLink";

export default function Index({ threads, trending_threads, search }) {

    const { data, setData, get } = useForm({
        search: search || '',
    });

    const handleClearSearch = () => {
        setData('search', '');
        get(route('threads.index'))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route('threads.index'));
    };

    return (
        <Container>
            <Head>
                <title>All Threads</title>
            </Head>
            <div className="grid w-full grid-cols-7  grid-flow-col-dense font-inter">
                <section className=" md:col-span-3 md:col-end-5 col-start-1 col-end-8 mt-2">
                    { threads.data.length === 0 && (
                        <NoThreads />
                    ) }
                    <ul className="mt-2 h-full w-full">
                        { threads.data.map((thread) => (
                            <ThreadBox thread={ thread } key={ thread.id } />
                        )) }
                    </ul>
                </section>
                <section className="hidden   mt-2 z-0	 sticky top-20 col-start-6  col-end-8 md:flex md:flex-col gap-8 h-min">
                    <div className=" bg-gray-100 border border-sand-sand4 px-2 py-2 space-y-3 rounded-md ">
                        <h3>search threads</h3>
                        <form onSubmit={ handleSubmit } className="flex gap-3 flex-col py-3">
                            <TextInput
                                value={ data.search }
                                onChange={ (e) => setData('search', e.target.value) }
                                type="text"
                                name="search" id="search"
                                placeholder="search threads" />
                            <div className="flex mt-2">
                                <PrimaryButton
                                    className="ml-1 text-center px-2 py-1 mx-1 "
                                    type="submit">

                                    search
                                </PrimaryButton>
                                <SecondaryButton onClick={ handleClearSearch } type="submit"
                                    className="ml-auto"
                                >
                                    Clear
                                </SecondaryButton>
                            </div>
                        </form>
                    </div>

                    <div className="w-full min-h-full  rounded-md p-2 space-y-2 bg-gray-100 border border-sand-sand4">
                        <h3>Trending threads</h3>
                        { trending_threads.length === 0 && (
                            <div className=" space-y-3 px-1">
                                <span>No trending threads now!</span>
                                <span>Try changing channels or try searching other threads.</span>
                            </div>
                        ) }

                        <ul className="px-1 space-y-2">
                            { trending_threads.map((thread) => (
                                <li key={ thread.path }>
                                    <Link href={ thread.path }>{ thread.title }</Link>
                                </li>)) }
                        </ul>
                    </div>
                </section>
            </div>
        </Container>
    );
}

function ThreadBox({ thread }) {
    return (
        <li
            key={ thread.id }
            className="bg-gray-100 my-4  border border-sand-sand5 rounded-md space-y-2 py-2"
        >
            <section className="flex w-full gap-4 items-center justify-between px-2">
                <span className="inline-flex rounded-md">
                    <Avatar
                        imageUrl={ thread?.author_avatar_path } className="w-9 h-9 ring-2 ring-gray-gray4"
                        alt={ `${thread?.author}'s profile pic` }
                    />
                </span>
                <h4 className="">{ thread.title }</h4>
            </section>
            <section className="px-2">
                <span className="text-xs text-gray-gray10 ">
                    <UserLink className={ 'no-underline hover:underline' } username={ thread?.author }>
                        { thread?.author }
                    </UserLink>
                    - { thread.created_at }
                </span>
            </section>
            <section className="px-2">
                <div
                    className="truncate"
                    dangerouslySetInnerHTML={ { __html: thread.body } }
                />
            </section>
            <section className="border-t px-2 pt-1">
                <div className="flex justify-between space-x-2 items-baseline">
                    <div className="flex items-center gap-3">
                        <Tooltip content="replies count">
                            <button className="max-w-fit flex items-center font-medium  gap-2  px-1 text-gray-gray11">
                                { thread.replies_count }
                                <ReplyCountIcon />
                            </button>
                        </Tooltip>

                        <Tooltip content="thread visits">
                            <button className="max-w-fit flex items-center font-medium  gap-2  px-1 text-gray-gray11">
                                { thread.visits }
                                <ViewsCountIcon />
                            </button>
                        </Tooltip>
                    </div>

                    <Link
                        className="no-underline"
                        href={ thread.route }>
                        See thread...
                    </Link>
                </div>
            </section>
        </li>
    )
}

function NoThreads() {
    return (
        <div className="bg-gray-100 my-4 p-2 border border-sand-sand5 rounded-md space-y-2">
            <h2>No threads now!</h2>
            <p>Try changing channels or see other threads e.g. unanswered threads or Try creating for yourself.  </p>
        </div>
    );
}