import { Link } from "@inertiajs/react";

export default function Activity({ activities }) {
    return (
        <ul className="h-full w-full py-2  md:col-start-2 md:col-span-3">
            { activities.map((activity) => (
                <li
                    key={ activity.id }
                    className="bg-gray-100 my-4 border border-sand-sand4 rounded-md space-y-2"
                >
                    {
                        activity.type === 'created_reply' && (
                            <>
                                <div className="flex gap-2 items-baseline justify-between border-b border-sand-sand4 px-2 py-3">
                                    <section>
                                        <span className="text-xs mr-2"> Replied on thread</span>
                                        <Link href={ activity.subject.thread.path }>{ activity.subject.thread.title }</Link>
                                    </section>
                                    <span className="text-xs "> { activity.subject.created_at }</span>
                                </div>
                                <div className="px-2 pb-1 space-y-2">

                                    <p className="truncate">{ activity.subject.body }</p>
                                </div>

                            </>
                        )
                    }

                    {
                        activity.type === 'created_thread' && (
                            <>
                                <div className="flex gap-2 items-baseline justify-between border-b border-sand-sand4 px-2 py-3">
                                    <section>
                                        <span className="text-xs mr-2">Created thread</span>
                                        <Link href={ activity.subject.route }>{ activity.subject.title }</Link>
                                    </section>
                                    <span className="text-xs "> { activity.subject.created_at }</span>
                                </div>
                                <div className="px-2 py-1 space-y-2">
                                    <p className="truncate">{ activity.subject.body }</p>
                                </div>

                            </>
                        )
                    }
                </li>
            )) }
        </ul>

    )

}
