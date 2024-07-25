import Container from "@/Components/Container";
import { Link, Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";


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
                <section className="hidden   mt-2 z-0	 sticky top-20 col-start-6  col-end-8 md:flex md:flex-col gap-8 h-min">
                    <div className=" bg-gray-100 border border-sand-sand4 px-2 py-2 space-y-3 rounded-md ">
                        <h3>search threads</h3>
                        <form onSubmit={ handleSubmit } className="flex gap-3  flex-col py-3">
                            <TextInput
                                value={ data.search }
                                onChange={ (e) => setData('search', e.target.value) }
                                type="text"
                                name="search" id="search"
                                placeholder="search threads" />
                            <div className="flex">
                                <PrimaryButton
                                    className="ml-1 text-center px-2 py-1 mx-1 "
                                    type="submit">

                                    search
                                </PrimaryButton>
                                <PrimaryButton
                                    className="ml-auto bg-tomato-tomato11 hover:bg-tomato-tomato9 text-red-red11 ring-2 ring-tomato-tomato9"
                                    onClick={ handleClearSearch } type="submit"
                                >
                                    Clear
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    <div className="w-full min-h-full  rounded-md p-2 space-y-2 bg-gray-100 border border-sand-sand4">
                        <h3>Trending threads</h3>
                        { trending_threads.length === 0 && (
                            <div className="bg-gray-100 my-4 p-2 border border-sand-sand5 rounded-md space-y-2">
                                <h2>No trending threads now!</h2>
                                <p> Try changing channels or try searching other threads. </p>
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

function NoThreads() {
    return (
        <div className="bg-gray-100 my-4 p-2 border border-sand-sand5 rounded-md space-y-2">
            <h2>No threads now!</h2>
            <p>Try changing channels or try searching other threads e.g. unanswered threads. </p>
        </div>
    );
}