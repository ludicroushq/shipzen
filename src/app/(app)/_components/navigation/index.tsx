"use client";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
} from "@nextui-org/react";
import type { Session } from "next-auth";
import { useState } from "react";
import { Logo } from "../logo";
import { NavigationItems } from "./navigation-items";

type NavigationProps = {
	session: Session | null;
};

export function Navigation(props: NavigationProps) {
	const { session } = props;
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<Navbar
			classNames={{
				wrapper: "container px-8 sm:px-14 md:px-16",
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
				<NavigationItems session={session} />
			</NavbarContent>

			<NavbarMenu>
				<NavigationItems session={session} />
			</NavbarMenu>
			<NavbarContent className="flex md:hidden" justify="end">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				/>
			</NavbarContent>
		</Navbar>
	);
}
