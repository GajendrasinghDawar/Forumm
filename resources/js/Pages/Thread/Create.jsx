import Container from "@/Components/Container";
import { useForm, usePage } from "@inertiajs/react";

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectMenu from "@/Components/SelectMenu";

export default function Create() {
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
        <Container>
            <div className="md:grid md:grid-cols-5">
                <div className="space-y-1 my-3 md:col-start-2 md:col-span-3 py-2 px-1">
                    <form onSubmit={ submit } className="my-3  gap-1 space-y-5 text-gray-gray11 justify-start	">
                        <section className="flex justify-between items-center  w-full gap-2">
                            <div className="grow  ">
                                <InputLabel htmlFor="title" value="Title" />

                                <TextInput
                                    id="title"
                                    title="title"
                                    type="text"
                                    value={ data.title }
                                    onChange={ (e) => setData("title", e.target.value) }
                                    placeholder="Title"
                                    className="mt-1 block w-full text-sand-sand11"
                                    autoComplete="title"

                                />
                                { errors.title && (
                                    <InputError message={ errors.title } className="mt-2" />
                                ) }
                            </div>
                            <div className="">
                                <InputLabel
                                    htmlFor="channel_id" value="Channels" />
                                <SelectMenu
                                    name="channel_id"
                                    id="channel_id"
                                    onChange={ (e) => {
                                        setData("channel_id", e.target.value);
                                    } }
                                    options={ channels }
                                />

                                { errors.channel_id && (
                                    <InputError message={ errors.channel_id } className="mt-2" />

                                ) }
                            </div>
                        </section>
                        <div className="col-span-6">
                            <textarea
                                type="text"
                                value={ data.body }
                                onChange={ (e) => setData("body", e.target.value) }
                                rows="4"
                                cols={ 2 }
                                placeholder="write thread."
                                className="border border-sand-sand6 focus:bg-sand-sand4 focus:border-sand-sand9 focus:ring-0 rounded-md w-full
                                 "
                                autoComplete="on"
                            />
                            { errors.body && (
                                <InputError message={ errors.body } className="mt-2" />
                            ) }
                        </div>

                        <PrimaryButton
                            type="submit"
                            disabled={ processing }
                        >
                            post thread
                        </PrimaryButton>
                    </form>
                </div>
            </div>

        </Container>
    );
}

