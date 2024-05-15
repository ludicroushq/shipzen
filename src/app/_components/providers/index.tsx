"use client";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
	const router = useRouter();

	return (
		<NextUIProvider className="h-full" navigate={router.push}>
			{children}
		</NextUIProvider>
	);
}
