"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
	error,
}: {
	error: NextError & { digest?: string };
}) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<html lang="en">
			<body>
				{/* biome-ignore lint/suspicious/noExplicitAny: instructions from sentry */}
				<NextError statusCode={undefined as unknown as any} />
			</body>
		</html>
	);
}
