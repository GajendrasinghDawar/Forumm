import Container from "@/Components/Container";
import { useForm, usePage } from "@inertiajs/react";

export default function Create() {
    return (
        <Container>
            <div>
                <h1>Create a new thread</h1>
                <ThreadForm />
            </div>
        </Container>
    );
}

function ThreadForm({}) {
    const { data, setData, reset, post, processing, errors } = useForm({
        body: "",
        title: "",
        channel_id: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("threads.store"), {
            preserveScroll: true,
            onSuccess: () => reset("body"),
        });
    }

    let {
        props: { channels },
    } = usePage();

    return (
        <form onSubmit={ submit } className="my-3 grid grid-cols-4 gap-1 space-y-5 text-gray-gray11 justify-start	">
            <div className="col-span-2 ">
                <input
                type="text"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
                placeholder="Title"
                    className="w-full p-4 border-1 border-iris-iris8 rounded-lg  focus:outline-none focus:ring-1 focus:ring-iris-iris8 focus:border-transparent transition ease-in-out delay-150"

                autoComplete="on"
            />
            {errors.title && (
                    <p className="text-tomato-tomato11 text-sm font-medium mt-1">
                    {errors.title}
                </p>
            )}
            </div>
            <div className="col-span-2">

                <select
                name="channel_id"
                id="channel_id"
                    className="w-full justify-self-start	 p-4  bg-gray-100 border-iris-iris8 rounded-lg focus:outline-none focus:ring-2 focus:ring-iris-iris8 focus:border-iris-iris7  transition ease-in-out duration-150 appearance-none"
                onChange={(e) => {
                    setData("channel_id", e.target.value);
                }}
            >
                {channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                        {channel.name}
                    </option>
                ))}
            </select>
                { errors.channel_id && (
                    <p className="text-tomato-tomato11 text-sm font-medium mt-1">
                        { errors.channel_id }
                    </p>
                ) }
            </div>
            <div className="col-span-6">
                <textarea
                type="text"
                value={data.body}
                onChange={(e) => setData("body", e.target.value)}
                rows="4"
                cols={2}
                placeholder="write thread."
                    className=" w-full h-32 p-4   border-1 border-iris-iris8 rounded-lg  focus:outline-none focus:ring-1 focus:ring-iris-iris8 focus:border-iris-iris7 focus:border-transparent transition ease-in-out delay-150"
                autoComplete="on"
            />
            {errors.body && (
                    <p className="text-tomato-tomato11 text-sm font-medium mt-1">
                    {errors.body}
                </p>
            )}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-purple-500 text-sand-sand4 font-semibold rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition ease-in-out delay-150  focus:ring-opacity-75"
            >
                post thread
            </button>
        </form>
    );
}
