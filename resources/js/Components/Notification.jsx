import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react'
import Dropdown from "@/Components/Dropdown";

export default function Notification({ user }) {
    const [ notifications, setNotifications ] = useState([]);

    useEffect(() => {
        fetch(route("user.notifications"))
            .then(response => response.json())
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

    return (
        <div>
            <Dropdown>
                <Dropdown.Trigger>
                    <button><span>Notification</span></button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <div className='px-2 py-1 '>
                        {
                            notifications.length > 0 ? <NotificationList notifications={ notifications } markAsRead={ markAsRead } /> : <h5 className='font-bold text-sm'>No notifications yet</h5>
                        }
                    </div>
                </Dropdown.Content>
            </Dropdown>
        </div >
    );

}


function NotificationList({ notifications, markAsRead }) {
    return (
        <ul className='space-y-3'>
            {
                notifications.map(notification => (
                    <li key={ notification.id }>
                        <Link href={ notification.data.path }>
                            { notification.data.message }
                        </Link>

                        <button
                            onClick={ (e, notificationId = notification.id) => markAsRead(notificationId) }
                            className='bg-tomato-tomato5 p-1 rounded mx-1 text-xs '
                        >mark as read</button>
                    </li>
                ))
            }
        </ul>
    )
}