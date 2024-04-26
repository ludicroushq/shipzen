import {
  Button,
  Link,
  type LinkProps,
  NavbarItem,
  type ButtonProps,
  type Merge,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import type { IconType } from 'react-icons/lib';

type NavigationLinkProps = {
  href: string;
  Icon: IconType;
} & Merge<LinkProps, ButtonProps>;

export function NavigationLink(props: NavigationLinkProps) {
  const { href, Icon, ...linkProps } = props;
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
        {...linkProps}
      />
    </NavbarItem>
  );
}
