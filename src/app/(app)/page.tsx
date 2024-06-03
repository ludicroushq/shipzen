import { signInAction } from "@/auth/actions";
import { Button } from "@nextui-org/react";
import { BiRightArrowAlt } from "react-icons/bi";

export default function Home() {
	return (
		<section className="container mt-12">
			<div className="prose prose-lg">
				<h1>TODO</h1>
				<p>TODO</p>
				<form action={signInAction}>
					<Button
						className="bg-foreground text-background"
						color="default"
						endContent={<BiRightArrowAlt />}
						type="submit"
						size="lg"
					>
						Get Started
					</Button>
				</form>
			</div>
		</section>
	);
}
