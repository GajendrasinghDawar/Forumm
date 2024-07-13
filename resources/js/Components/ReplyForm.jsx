import { useForm } from "@inertiajs/react";

export default function ReplyForm({ threadId }) {
    const { data, setData, reset, post, processing, errors } = useForm({
        body: "",
    });

    function submit(e) {
        e.preventDefault();
        post(
            route("reply.store", {
                // make it dynamic
                channel: "delectus",
                thread: threadId,
            }),
            {
                preserveScroll: true,
                onSuccess: () => reset("body"),
            }
        );
    }

    return (
        <form onSubmit={submit}>
            <textarea
                type="text"
                value={data.body}
                onChange={(e) => setData("body", e.target.value)}
                rows="4"
                cols={2}
                placeholder="Comment your thoughts."
                className="w-full h-32 p-4 text-gray-700 bg-gray-50 border-1 border-yellow-400 rounded-lg  focus:outline-none focus:ring-1 focus:ring-yellow-300 focus:border-transparent transition ease-in-out delay-150"
                autoComplete="on"
            />
            {errors.body && (
                <p className="text-red-500 text-sm font-medium mt-1">
                    {errors.body}
                </p>
            )}

            <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition ease-in-out delay-150  focus:ring-opacity-75"
            >
                Reply
            </button>
        </form>
    );
}
