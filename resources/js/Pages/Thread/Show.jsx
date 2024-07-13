export default function Show({ thread, replies }) {
    return (
        <div>
            <h1>Thread Show</h1>
            <div className="bg-gray-100 p-2 rounded-md">{thread.title}</div>
            <div>
                <h2 className="mt-4 font-semibold ">Replies</h2>
                {replies.data.map((reply) => (
                    <div key={reply.id} className="bg-gray-100 p-2 rounded-md">
                        <p>
                            replied by
                            <a href="#">
                                <span className="mx-1 font-semibold">
                                    {reply.user.name}
                                </span>{" "}
                            </a>
                            <span className="text-gray-500">
                                {" "}
                                {reply.created_at}
                            </span>
                        </p>
                        <p>{reply.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
