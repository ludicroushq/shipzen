import { Button, Link, NavbarItem } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import type { IconType } from 'react-icons/lib';

type NavigationLinkProps = {
  href: string;
  Icon: IconType;
} & PropsWithChildren;

export function NavigationLink(props: NavigationLinkProps) {
  const { href, children, Icon } = props;
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavbarItem>
      <Button
        as={Link}
        color="default"
        fullWidth
        href={href}
        isDisabled={isActive}
        size="lg"
        startContent={<Icon size="1.25em" />}
        variant={isActive ? 'flat' : 'light'}
      >
        {children}
      </Button>
    </NavbarItem>
  );
}
