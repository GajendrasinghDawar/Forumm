import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="h-full flex flex-col sm:justify-center  w-full items-center gap-5 py-4 ">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-sand-sand12" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md px-6   shadow-md overflow-hidden bg-sand-sand12 text-sand-sand1 py-3 sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
