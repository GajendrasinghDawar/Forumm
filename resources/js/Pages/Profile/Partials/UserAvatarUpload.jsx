import React, { useState } from 'react';
import { useForm } from '@inertiajs/react'
import { Transition } from '@headlessui/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { Avatar } from '@/ui/Avatar';

export default function UserAvatarUpload({ auth }) {
    const [ fileName, setFileName ] = useState('');
    const [ imagePreviewUrl, setImagePreviewUrl ] = useState('');

    const { data, errors, setData, post, progress, processing, recentlySuccessful } = useForm({
        avatar: null,
    })

    const handleFileChange = (e) => {
        const file = e.target.files[ 0 ];

        if (file)
        {
            setData('avatar', file);
            setFileName(file.name)

            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreviewUrl(reader.result)

            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user.avatar'), {
            onSuccess: () => {
                setFileName("")
            },
        });
    };

    return (
        <form onSubmit={ handleSubmit } className="flex  flex-col-reverse gap-4 md:gap-0 md:flex-row  justify-between  w-full">
            <section className="flex-1  flex flex-col gap-3 ">
                <div className=''>
                    <input type="file" name="avatar" id="avatar" className="hidden" onChange={ e => {
                        handleFileChange(e);
                        setData('avatar', e.target.files[ 0 ]);
                } } />
                    <label htmlFor="avatar" className="block w-full text-center py-2 px-4 cursor-pointer bg-sand-sand4 text-sand-sand11 border border-sand-sand6 rounded-md">
                        Upload Avatar
                    </label>
                </div>

                <div className="">
                    { fileName && <p className='inline-block'>{ fileName }</p> }
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={ processing }>Save</PrimaryButton>

                    <Transition
                        show={ recentlySuccessful }
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                    <InputError message={ errors.avatar } />
                </div>
            </section>
            <aside className="w-full  md:w-1/2 flex md:justify-end">
                { imagePreviewUrl ? <Avatar imageUrl={ imagePreviewUrl } className='h-[80px] w-[80px] md:h-[180px] md:w-[180px] ' alt={ `${auth.user.name}'s profile picture` } /> :
                    <Avatar imageUrl={ auth.user.avatar_path } className='h-[80px] w-[80px] md:h-[180px] md:w-[180px] ' alt={ `${auth.user.name}'s profile picture` } />
                }
            </aside>
        </form>
    );
};
