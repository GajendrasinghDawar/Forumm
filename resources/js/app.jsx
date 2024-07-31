import './bootstrap';
import '../css/app.css';

import { createRoot, hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import Authenticated from "@/Layouts/AuthenticatedLayout";

const appName = import.meta.env.VITE_APP_NAME || "Forumm";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        let page = resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        );

        let newpage = await page;

        newpage.default.layout =
            newpage.default.layout ||
            ((page) => (
                <Authenticated
                    children={page}
                user={ page.props?.auth?.user }
                />
            ));

        return newpage;
    },
    setup({ el, App, props }) {
        if (import.meta.env.DEV) {
            createRoot(el).render(<App {...props} />);
            return;
        }

        hydrateRoot(el, <App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
