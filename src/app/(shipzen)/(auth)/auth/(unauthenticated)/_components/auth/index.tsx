"use client";
import { SafeActionError } from "@/app/_components/safe-action-error";
import { Button, Input } from "@nextui-org/react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useRef } from "react";
import { createAuthAction } from "./actions";

export function Auth() {
	const { execute, status, result } = useAction(createAuthAction);

	const emailRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		emailRef.current?.focus();
	}, []);

	return (
		<form
			className="space-y-2"
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.target as HTMLFormElement);
				execute({
					email: formData.get("email") as string,
				});
			}}
		>
			<SafeActionError result={result} />
			<Input
				name="email"
				fullWidth
				label="Email Address"
				size="lg"
				type="email"
				variant="bordered"
				errorMessage={result.validationErrors?.email?.toString()}
				isInvalid={!!result.validationErrors?.email?.length}
				ref={emailRef}
			/>

			<Button
				color="primary"
				fullWidth
				size="lg"
				type="submit"
				isLoading={status === "executing"}
			>
				Continue
			</Button>
		</form>
	);
}
