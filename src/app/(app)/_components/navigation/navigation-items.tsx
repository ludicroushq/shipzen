import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from '@nextui-org/react';
import type { User } from 'lucia';
import { BiChevronDown, BiHomeAlt2, BiLogIn } from 'react-icons/bi';
import { NavigationLink } from './_utils/navigation-link';

type NavigationItemsProps = {
  user: User | undefined;
};
export function NavigationItems(props: NavigationItemsProps) {
  const { user } = props;

  if (!user) {
    return (
      <>
        <NavigationLink Icon={BiHomeAlt2} href="/">
          Home
        </NavigationLink>
        <NavigationLink Icon={BiLogIn} href="/auth">
          Get Started
        </NavigationLink>
      </>
    );
  }

  const { displayName } = user;

  return (
    <>
      <NavigationLink Icon={BiHomeAlt2} href="/">
        Home
      </NavigationLink>
      <NavbarItem>
        <Dropdown>
          <DropdownTrigger>
            <Button
              color="default"
              endContent={<BiChevronDown size="1.25em" />}
              fullWidth
              size="lg"
              startContent={<Avatar name={displayName} size="sm" />}
              variant="light"
            >
              <span className="truncate md:max-w-32">{displayName}</span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile" disabledKeys={['profile']}>
            <DropdownItem className="gap-2" key="profile" showDivider>
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.email}</p>
            </DropdownItem>
            <DropdownItem color="danger" href="/auth/destroy" key="logout">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>
    </>
  );
}
