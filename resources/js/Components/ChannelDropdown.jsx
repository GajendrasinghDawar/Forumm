import { usePage } from "@inertiajs/react";

import { NavigationMenu, NavigationMenuTrigger, NavigationMenuList, NavigationMenuItem } from "@/ui/NavigationMenu";

import React from 'react';

export function ChannelDropdown() {
    let {
        props: { channels },
    } = usePage();

    return (
        <NavigationMenu>
            <NavigationMenuTrigger title="Channels" />
            <NavigationMenuList>
                { channels.map((channel) => (
                    <NavigationMenuItem key={ channel.slug } href={ route("threads.index", channel.slug) }>
                        { channel.name }
                    </NavigationMenuItem>
                )) }
            </NavigationMenuList>
        </NavigationMenu>
    );
}

