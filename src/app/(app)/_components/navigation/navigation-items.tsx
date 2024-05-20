import { signInAction } from "@/auth/actions";
import type { Session } from "next-auth";
import { BiHomeAlt2, BiLogIn } from "react-icons/bi";
import { NavigationLink } from "./_components/navigation-link";
import { UserDropdown } from "./_components/user-dropdown";

type NavigationItemsProps = {
	session: Session | null;
};
export function NavigationItems(props: NavigationItemsProps) {
	const { session } = props;

	if (!session) {
		return (
			<>
				<NavigationLink Icon={BiHomeAlt2} href="/">
					Home
				</NavigationLink>
				<form action={signInAction}>
					<NavigationLink Icon={BiLogIn} type="submit">
						Get Started
					</NavigationLink>
				</form>
			</>
		);
	}

	return (
		<>
			<NavigationLink Icon={BiHomeAlt2} href="/">
				Home
			</NavigationLink>
			<UserDropdown session={session} />
		</>
	);
}
