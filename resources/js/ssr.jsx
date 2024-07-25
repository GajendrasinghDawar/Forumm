import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { route } from '../../vendor/tightenco/ziggy';

import Authenticated from "@/Layouts/AuthenticatedLayout";

const appName = import.meta.env.VITE_APP_NAME || "Forumm";

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
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
                        children={ page }
                        user={ page.props.auth.user }
                    // permissions={page.props.permissions}
                    />
                ));

            return newpage;
        },

        setup: ({ App, props }) => {
            global.route = (name, params, absolute) =>
                route(name, params, absolute, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                });

            return <App {...props} />;
        },
    })
);
