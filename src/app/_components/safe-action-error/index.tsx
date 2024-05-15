import { Card, CardBody } from "@nextui-org/react";
import type { HookResult } from "next-safe-action/hooks";

type SafeActionErrorProps = {
	result: HookResult<never, unknown>;
};
export function SafeActionError(props: SafeActionErrorProps) {
	const { result } = props;

	const errorMessage =
		result.fetchError ??
		result.serverError ??
		result.validationErrors?._root?.toString();

	if (!errorMessage) return null;

	return (
		<Card className="border border-danger-200 bg-danger-100 text-foreground">
			<CardBody>{errorMessage}</CardBody>
		</Card>
	);
}
