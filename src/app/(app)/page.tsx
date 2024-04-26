import { Button, Link } from "@nextui-org/react";
import { BiRightArrowAlt } from "react-icons/bi";

export default function Home() {
	return (
		<section className="container mt-12">
			<div className="prose prose-xl mx-auto">
				<center>
					<h1>TODO</h1>
					<p>TODO</p>
					<p>
						<Button
							as={Link}
							className="bg-foreground text-background"
							color="default"
							endContent={<BiRightArrowAlt />}
							href="/auth"
							size="lg"
						>
							Get Started
						</Button>
					</p>
				</center>
			</div>
		</section>
	);
}
