import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react'
import { Transition } from '@headlessui/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function UserAvatarUpload() {

    const { data, errors, setData, post, progress, processing, recentlySuccessful } = useForm({
        avatar: null,
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('user.avatar'), {
            onSuccess: () => {
                console.log('success')
            },
        });
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={ handleSubmit } className="flex flex-col items-center space-y-4">
                <input type="file" name='avatar' id='avatar' onChange={ e => {
                    setData('avatar', e.target.files[ 0 ])
                } } />
                { progress && (
                    <progress value={ progress.percentage } max="100">
                        { progress.percentage }%
                    </progress>
                ) }
                <InputError message={ errors.avatar } />
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
                </div>
            </form>
        </div>
    );
};
