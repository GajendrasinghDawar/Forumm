import { Link, Head } from '@inertiajs/react';

export default function Welcome({}) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <h1>Welcome</h1>
            </div>
        </>
    );
}
