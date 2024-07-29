import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

import Dropdown from "@/Components/Dropdown";
import UserLink from "@/Components/UserLink";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import MentionText from "@/Components/MentionText";
import Tooltip from "@/ui/Tooltip";
import { LikeCountIcon } from "@/ui/Icons";

export default function ReplySection({ replies, thread }) {
    const [ editing, setEditing ] = useState(null);
    let { props } = usePage();

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
                            <UserLink username={ reply.user?.username } />
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

                                    <Link
                                        as="button"
                                        href={ route("replies.destroy", {
                                            reply: reply.id,
                                        }) }
                                        method="delete"
                                        preserveScroll
                                        className="p-1 hover:bg-tomato-tomato3 text-tomato-tomato11 w-full transition duration-150 ease-in-out text-center"
                                    >
                                        Delete reply
                                    </Link>
                                </ReplySectionDropdown>
                            ) }
                        </div>
                    </section>

                    <div className="px-2">
                        {
                            editing == reply.id ? (
                                <EditForm reply={ reply } setEditing={ setEditing } />
                            ) : (
                                    <MentionText text={ reply.body } />
                            )
                        }
                    </div>

                    <div className="border-t py-2 border-sand-sand5 px-1 flex justify-between items-baseline pr-2">
                        <div className="flex items-center gap-3">
                            <Tooltip content="replies count">
                                <button className="max-w-fit flex items-center font-medium  gap-2  px-1 text-gray-gray11">
                                    { reply.favorites_count }
                                    <LikeCountIcon />
                                </button>
                            </Tooltip>

                            { reply.isBest && (
                                <p className="text-grass-grass11 bg-grass-grass4 text-xs font-semibold inline-block  p-1">
                                    { "Best Reply!" }
                                </p>
                            ) }
                        </div>
                        <div>

                            { props.auth?.user && (
                            <Link
                                as="button"
                                href={ route(
                                    "replies.favorite",
                                    {
                                        reply: reply.id,
                                    }) }
                                method={ reply.isFavorited ? "delete" : "post" }
                                preserveScroll
                                    className={ `ml-1 inline-block text-sand-sand11 font-medium  transition-colors  py-1 w-min h-min px-2  text-xs rounded ${reply.isFavorited ? 'text-sand-sand3  bg-grass-grass10 hover:bg-grass-grass9 ' : 'bg-sand-sand6'}` }
                            >

                                { reply.isFavorited ? "Unfavorite" : "Favorite" }
                            </Link>
                        )
                        }

                        { thread.can.update && !(reply.isBest) && (
                            <Link
                                as="button"
                                href={ route(
                                    "best_reply.store",
                                    {
                                        reply: reply.id,
                                    }) }
                                method="post"
                                preserveScroll
                                className={ `ml-1 w-fit inline-block  transition-colors  py-1 h-min px-2  text-xs rounded text-iris-iris11 font-semibold bg-iris-iris5  border border-iris-iris6 hover:bg-iris-iris6` }
                            >
                                mark as best
                            </Link>
                        ) }
                        </div>
                    </div>
                </article>
            ))
            }
        </section >
    )
}


function EditForm({ reply, setEditing, }) {
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
                <button className="bg-sand-sand4 hover:bg-sand-sand3 border hover:border-sand-sand4 border-sand-sand5 rounded-full p-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-sand-sand9"
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