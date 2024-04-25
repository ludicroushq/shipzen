'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { useState } from 'react';
import type { User } from 'lucia';
import { Logo } from '../logo';
import { NavigationItems } from './navigation-items';

type NavigationProps = {
  user: User | undefined;
};

export function Navigation(props: NavigationProps) {
  const { user } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      classNames={{
        wrapper: 'container px-8 sm:px-14 md:px-16',
      }}
      height="4.5rem"
      isMenuOpen={isMenuOpen}
      isBordered
      onMenuOpenChange={setIsMenuOpen}
      position="static"
    >
      <NavbarContent justify="start">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="end">
        <NavigationItems user={user} />
      </NavbarContent>

      <NavbarMenu>
        <NavigationItems user={user} />
      </NavbarMenu>
      <NavbarContent className="flex md:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>
    </Navbar>
  );
}
