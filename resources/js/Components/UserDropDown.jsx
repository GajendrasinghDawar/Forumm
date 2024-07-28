import Dropdown from "@/Components/Dropdown";
import { Avatar } from "@/ui/Avatar";

export function UserDropDown({ user }) {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md py-2">
                    <Avatar
                        imageUrl={ user.avatar_path } className="w-9 h-9"
                        alt={ `${user.name}'s profile and logout link drop down` } />
                </span>
            </Dropdown.Trigger>

            <Dropdown.Content>
                <Dropdown.Link href={ route("profile.edit") }>
                    Profile
                </Dropdown.Link>
                <Dropdown.Link href={ route("logout") } method="post" as="button">
                    Log Out
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    );
}