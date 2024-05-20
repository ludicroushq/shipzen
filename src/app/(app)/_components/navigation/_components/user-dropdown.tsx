"use client";
import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	NavbarItem,
} from "@nextui-org/react";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { BiChevronDown } from "react-icons/bi";

type UserDropdownProps = {
	session: Session;
};

export function UserDropdown(props: UserDropdownProps) {
	const { session } = props;
	const { displayName, email } = session.user;

	return (
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
				<DropdownMenu aria-label="Profile" disabledKeys={["profile"]}>
					<DropdownItem className="gap-2" key="profile" showDivider>
						<p className="font-semibold">Signed in as</p>
						<p className="font-semibold">{email}</p>
					</DropdownItem>
					<DropdownItem onClick={() => signOut()} color="danger" key="logout">
						Sign Out
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</NavbarItem>
	);
}
