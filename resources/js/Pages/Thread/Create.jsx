import Container from "@/Components/Container";
import { useForm, usePage } from "@inertiajs/react";

import ThreadForm from "@/Components/ThreadForm";


export default function Create({ thread }) {
    const { data, setData, reset, patch, post, processing, errors } = useForm({
        body: thread?.data?.body || '',
        title: thread?.data?.title || '',
        channel_id: thread?.data?.channel_id || '',
    });

    function submit(e) {
        e.preventDefault();

        if (thread)
        {
            patch(route("threads.update", thread.data.slug), {
                preserveScroll: true,
                onSuccess: () => reset("body"),
            });
            return
        }

        post(route("threads.store"), {
            preserveScroll: true,
            onSuccess: () => reset("body"),
        });
    }

    let {
        props: { channels },
    } = usePage();

    return (
        <Container>
            <div className="md:grid  md:grid-cols-7  md:grid-flow-col-dense  w-full">
                <div className="my-3 py-6  md:col-start-2  md:col-end-8">
                    <ThreadForm thread={ thread } data={ data } setData={ setData } handleSubmit={ submit } channels={ channels } processing={ processing } errors={ errors } />
                </div>
            </div>
        </Container>
    );
}

