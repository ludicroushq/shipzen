"use client";
import { SafeActionError } from "@/app/_components/safe-action-error";
import { Button, Input } from "@nextui-org/react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useRef } from "react";
import { verifyAuthAction } from "./actions";

type VerifyProps = {
	code: string;
};
export function Verify(props: VerifyProps) {
	const { code } = props;
	const tokenRef = useRef<HTMLInputElement>(null);
	const { execute, result, status } = useAction(verifyAuthAction);

	useEffect(() => {
		tokenRef.current?.focus();
	}, []);

	return (
		<form
			className="space-y-2"
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.target as HTMLFormElement);
				execute({
					code: formData.get("code") as string,
					token: formData.get("token") as string,
				});
			}}
		>
			<SafeActionError result={result} />
			<Input
				fullWidth
				label="Token"
				name="token"
				size="lg"
				variant="bordered"
				ref={tokenRef}
				errorMessage={result.validationErrors?.token?.toString()}
				isInvalid={!!result.validationErrors?.token?.length}
			/>
			<input type="hidden" name="code" value={code} />
			<Button
				color="primary"
				type="submit"
				size="lg"
				fullWidth
				isLoading={status === "executing"}
			>
				Continue
			</Button>
		</form>
	);
}
