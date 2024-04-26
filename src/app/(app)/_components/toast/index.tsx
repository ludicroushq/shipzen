"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";

function getType(type: string) {
  switch (type) {
    case "success":
      return "success";
    case "error":
      return "error";
    case "warning":
      return "warning";
    case "info":
      return "info";
    default:
      return "info";
  }
}

export function Toast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const queryParam = searchParams.get("toast");
    if (!queryParam) return;
    const [type, message] = queryParam.split(":");
    if (!type || !message) return;

    toast[getType(type)](message);

    const newParams = new URLSearchParams(searchParams);
    newParams.delete("toast");
    router.replace(`${pathname}?${newParams.toString()}`);
  }, [pathname, router, searchParams]);
  return <Toaster position="top-center" richColors />;
}
