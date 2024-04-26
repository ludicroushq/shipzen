import { AUTH_EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_MINUTES } from "@/auth/server/routers/auth/create/constants";
import { Button, CardBody, CardHeader, Link } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_VERIFICATION_CODE_COOKIE_NAME } from "../../_utils/constants";
import { Verify } from "./_components/verify";

export default function Page() {
	const code = getCookie(AUTH_VERIFICATION_CODE_COOKIE_NAME, { cookies });
	if (!code) redirect("/auth?toast=error:The auth timed out. Please try again");

	return (
		<>
			<CardHeader className="prose prose-lg block">
				<h1 className="mb-0">Enter code</h1>
				<p>
					Please check your inbox for the verification code we sent to your
					email address.
				</p>
			</CardHeader>
			<CardBody className="space-y-4">
				<Verify code={code} />
				<hr />
				<div className="prose">
					<p>
						If you didn&lsquo;t receive one, check your spam folder or try
						again. The email expires in{" "}
						{AUTH_EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_MINUTES} minutes.
					</p>
					<div>
						<Button
							as={Link}
							fullWidth
							color="danger"
							href="/auth"
							size="lg"
							variant="light"
						>
							Restart
						</Button>
					</div>
				</div>
			</CardBody>
		</>
	);
}
