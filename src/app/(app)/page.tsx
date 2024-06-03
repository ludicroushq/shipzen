import { signInAction } from "@/auth/actions";
import { Button } from "@/shadcn/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
	return (
		<section className="container mt-12">
			<div className="prose prose-lg">
				<h1>TODO</h1>
				<p>TODO</p>
				<form action={signInAction}>
					<Button size="lg" type="submit">
						Get Started
						<ArrowRightIcon className="ml-2 h-4 w-4" />
					</Button>
				</form>
			</div>
		</section>
	);
}
