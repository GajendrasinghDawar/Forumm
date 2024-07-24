import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectMenu from "@/Components/SelectMenu";

import MarkDownEditor from "@/Components/Tiptap/MarkdownEditor";

export default function ThreadForm({ data, setData, handleSubmit, channels, processing, errors }) {

    return (
        <form onSubmit={ handleSubmit } className="my-3  gap-1 space-y-5 text-gray-gray11 justify-start	">
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
                        value={ data.channel_id }
                        options={ channels }
                    />

                    { errors.channel_id && (
                        <InputError message={ errors.channel_id } className="mt-2" />

                    ) }
                </div>
            </section>
            <div className="col-span-6">
                <MarkDownEditor value={ data.body } setData={ setData } />

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
    );
}

