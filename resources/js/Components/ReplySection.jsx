import UserLink from "@/Components/UserLink";
import { Head, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import React, { useState } from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ReplySection({ replies, auth }) {
    let { props } = usePage();
    const [ editing, setEditing ] = useState(null);

    const { data, setData, reset, processing, errors, delete: destroy } = useForm({});

    function handleDeleteSubmit(e, id) {
        e.preventDefault();
        destroy(
            route("replies.destroy", {
                reply: id,
            }),
            {
                preserveScroll: true,
            }
        );
    }

    return (
        <section className="mt-4">
            { replies?.map((reply) => (
                <article
                    key={ reply.id }
                    id={ `reply-${reply.id}` }
                    className="bg-gray-100 my-4  border border-sand-sand4 rounded-md space-y-3"
                >
                    <section className="flex justify-between items-center  py-1 px-2">
                        <p>
                            <span> replied by</span>
                            <UserLink name={ reply.user.name } />
                            <span> { reply.created_at }</span>
                        </p>
                        <div>
                            { props.auth?.user && reply.can.update && (
                                <ReplySectionDropdown  >
                                    <button
                                        className="p-1  hover:bg-sand-sand3 text-sand-sand11 w-full transition duration-150 ease-in-out"
                                        onClick={ () => setEditing(reply.id) }
                                    >
                                        Edit
                                    </button>

                                    <form onSubmit={ (e, id = reply.id) => handleDeleteSubmit(e, id) }>
                                        <button className="p-1 hover:bg-tomato-tomato3 text-tomato-tomato11 w-full transition duration-150 ease-in-out">Delete thread</button>
                                    </form>
                                </ReplySectionDropdown>
                            ) }
                        </div>
                    </section>
                    <div className="px-2">
                        {
                            editing == reply.id ? (
                                <EditForm reply={ reply } setEditing={ setEditing } />
                            ) : (
                                <p>{ reply.body }</p>
                            )
                        }

                    </div>
                    <div className="border-t py-2 border-sand-sand5 px-1">
                        { props.auth?.user && (
                            <Link
                                as="button"
                                href={
                                    route(
                                        "replies.favorite",
                                        {
                                            reply: reply.id,
                                        }
                                    ) }
                                method="post"
                                preserveScroll
                                className="ml-1 inline-block bg-sand-sand5 hover:bg-sand-sand6 transition-colors  py-1 w-min h-min px-2  text-xs rounded"
                                disabled={
                                    reply.isFavorited
                                        ? true
                                        : false
                                }
                            > <span className="mx-1 ">
                                    { reply.favorites_count }
                                </span>
                                Favorite
                            </Link>) }

                    </div>
                </article>
            ))
            }
        </section >
    )
}


function EditForm({ reply, setEditing, children }) {
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        body: reply.body,
    });

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        patch(
            route("replies.update", {
                reply: reply.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => setEditing(null),
            }
        );
    };
    return (
        <form onSubmit={ handleUpdateSubmit }>
            <textarea
                cols={ 4 }
                value={ data.body }
                onChange={ (e) => setData("body", e.target.value) }
                className="mt-4 w-full text-gray-900 0border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            ></textarea>
            <InputError message={ errors.body } className="mt-2" />
            <div className="space-y-2 ">
                <PrimaryButton className="mr-4">Save</PrimaryButton>
                <PrimaryButton
                    className=" bg-jade-jade10 focus:ring-jade-jade8 ring-jade-jade10 hover:bg-jade-jade8 "
                    onClick={ () => {
                        setEditing(false);
                        reset();
                        clearErrors();
                    } }
                >
                    Cancel
                </PrimaryButton>
            </div>
        </form>
    );
}


function ReplySectionDropdown({ children }) {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                { children }
            </Dropdown.Content>
        </Dropdown>
    )
}