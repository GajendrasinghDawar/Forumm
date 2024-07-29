import { usePage } from "@inertiajs/react";
import { NavigationMenu, NavigationMenuTrigger, NavigationMenuList, NavigationMenuItem } from "@/ui/NavigationMenu";

export function BrowseDropdown() {

    let {
        props: {
            auth: { user },
        },
    } = usePage();

    return (
        <NavigationMenu>
            <NavigationMenuTrigger title="browse" />
            <NavigationMenuList>
                <>
                    { user && (
                        <NavigationMenuItem href={ route("threads.index", {
                            _query: {
                                by: user.name,
                            },
                        }) }>
                            My threads
                        </NavigationMenuItem>
                    ) }
                    <NavigationMenuItem href={ route("threads.index") }>
                        All Threads
                    </NavigationMenuItem>
                    <NavigationMenuItem href={ route("threads.index", {
                        _query: {
                            popular: 1,
                        },
                    }) }>
                        Popular threads
                    </NavigationMenuItem>
                    <NavigationMenuItem href={ route("threads.index", {
                        _query: {
                            unanswered: 1,
                        },
                    }) }>
                        Unanswered
                    </NavigationMenuItem>
                </>
            </NavigationMenuList>
        </NavigationMenu >
    );
}
