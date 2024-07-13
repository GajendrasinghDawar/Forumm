export default function Show({ thread, replies }) {
    return (
        <div>
            <h1>Thread Show</h1>
            <div className="bg-gray-100 p-2 rounded-md">{thread.title}</div>
            <div>
                <h2 className="mt-4 font-semibold ">Replies</h2>
                {replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-100 p-2 rounded-md">
                        {reply.body}
                    </div>
                ))}
            </div>
        </div>
    );
}
