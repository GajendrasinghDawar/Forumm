import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="h-full flex flex-col sm:justify-center  w-full items-center gap-5 py-4 text-gray-gray11">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-sand-sand12" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md px-6   overflow-hidden bg-sand-sand3 border border-sand-5 text-sand-sand12 py-3 sm:rounded-lg rounded-md ">
                {children}
            </div>
        </div>
    );
}
