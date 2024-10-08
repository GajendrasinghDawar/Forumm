import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

export default function ReplyForm({ threadId }) {
    const { data, setData, reset, post, processing, errors } = useForm({
        body: "",
    });

    function submit(e) {
        e.preventDefault();
        post(
            route("replies.store", {
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
                className="w-full h-32 p-4 text-gray-gray11  bg-sand-sand2 border-1 border-sand-sand9 rounded-lg  focus:outline-none focus:ring-1 focus:ring-sand-sand10 focus:border-transparent transition ease-in-out delay-50"
                autoComplete="on"
            />
            {errors.body && (
                <p className="text-tomato-tomato11 text-sm font-medium mt-1 mb-2">
                    {errors.body}
                </p>
            )}

            <PrimaryButton
                type="submit"
                disabled={ processing }
                className="mt-3"
            >
                Reply
            </PrimaryButton>
        </form>
    );
}
