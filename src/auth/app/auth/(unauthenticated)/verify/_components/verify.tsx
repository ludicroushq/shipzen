"use client";
import { trpcReactQuery } from "@/app/_utils/trpc/react-query";
import { authVerifyInputSchema } from "@/auth/server/routers/auth/verify/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { errorMap } from "zod-validation-error";

type VerifyProps = {
	code: string;
};
export function Verify(props: VerifyProps) {
	const { code } = props;
	const mutation = trpcReactQuery.auth.verify.useMutation();
	const form = useForm<z.infer<typeof authVerifyInputSchema>>({
		defaultValues: {
			code,
			token: "",
		},
		resolver: zodResolver(authVerifyInputSchema, { errorMap }),
	});
	const router = useRouter();

	useEffect(() => {
		form.setFocus("token");
	}, [form]);

	async function onSubmit(data: z.infer<typeof authVerifyInputSchema>) {
		await mutation.mutateAsync(data);
		router.refresh();
	}

	return (
		<form
			className="space-y-2"
			onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
		>
			<Controller
				control={form.control}
				name="token"
				render={({ field }) => (
					<Input
						fullWidth
						label="Token"
						size="lg"
						variant="bordered"
						{...field}
					/>
				)}
			/>
			<Button
				color="primary"
				type="submit"
				size="lg"
				fullWidth
				isLoading={form.formState.isSubmitting}
			>
				Continue
			</Button>
		</form>
	);
}
