import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react'

import Modal from "@/ui/Model";
import { Cross2Icon } from "@radix-ui/react-icons"
import { DeleteIcon, NotificationIcon } from '@/ui/Icons';
import SecondaryButton from '@/ui/SecondaryButton';

export default function Notification() {
    const [ notifications, setNotifications ] = useState([]);
    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        fetch(route("user.notifications"))
            .then(response => {
                if (!response.ok)
                {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setNotifications(data);
            });
    }, []);

    const markAsRead = (notificationId) => {
        router.delete(route(
            "user.notifications.destroy",
            {
                notification: notificationId
            }), {
            preserveState: true,
            onSuccess: () => {
                setNotifications(notifications.filter(n => n.id !== notificationId));
            }
        });
    }

    function onOpenChange(open) {
        setOpen(open);
    }

    return (
        <Modal onOpenChange={ onOpenChange } open={ open }>
            <Modal.Trigger asChild>
                <button className={ `rounded-lg p-1 bg-gray-gray3  hover:bg-gray-gray4 border border-gray-gray5 flex justify-center items-center min-w-8 min-h-[30px] mx-2 md:mx-3` }>
                    <NotificationIcon />
                </button>
            </Modal.Trigger>
            <Modal.Content open={ open }>
                <div className="grid grid-rows-[auto_1fr_auto] h-[70vh] md:h-[60vh] lg:h-[50vh]">

                    <header className="flex items-center gap-2 px-3 py-4 justify-between border-b border-sand-sand6">
                        <div className='flex items-baseline gap-2'>
                            <Modal.Title className="text-gray-12 m-0 text-xl font-Medium">
                                Notifications
                            </Modal.Title>
                            <Modal.Description className="text-gray-gray11 text-sm font-medium">
                                All your notifications
                            </Modal.Description>
                        </div>
                        <Modal.Close asChild>
                            <button
                                className={ `rounded-lg bg-gray-gray3  hover:bg-gray-gray4 border border-gray-gray5 flex justify-center items-center p-1 mx-2  md:mx-3 text-gray-gray11 ml-auto group
                                ` }
                                aria-label="Close"
                            >
                                <Cross2Icon className='group-hover:text-gray-gray12 ' />
                            </button>
                        </Modal.Close>
                    </header>

                    <main className='px-3 overflow-y-auto'>
                        {
                            notifications.length === 0 && (
                                <div className='flex items-center justify-center h-full p-0 -my-3'>
                                    <h2>No notifications</h2>
                                </div>
                            )
                        }
                        <ul className='space-y-3 py-3'>
                            {
                                notifications.map(notification => (
                                    <li
                                        key={ notification.id }
                                        className='w-full flex justify-between items-center my-2  py-2 rounded-lg'
                                    >
                                        <Link
                                            className='no-underline truncate capitalize  px-2'
                                            href={ notification.data.path }>
                                            { notification.data.message }
                                        </Link>

                                        <button
                                            onClick={ (e, notificationId = notification.id) => markAsRead(notificationId) }
                                            className={ `rounded-lg border-gray-gray5 flex justify-center items-center   
                                            p-1 ml-auto` }
                                        >
                                            <DeleteIcon className={ 'hover:text-gray-gray12' }
                                            />
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </main>

                    <footer className="flex items-end justify-end gap-5 w-full py-3  pr-5 border-t border-sand-sand6">
                        <Modal.Close
                            asChild
                        >
                            <SecondaryButton>
                                Cancel
                            </SecondaryButton>
                        </Modal.Close>
                    </footer>
                </div>
            </Modal.Content>
        </Modal>
    );

}
