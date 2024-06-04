'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Toaster } from '@/shadcn/ui/sonner';

function getType(type: string) {
  switch (type) {
    case 'success':
      return 'success';
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    default:
      return 'info';
  }
}

export function Flash() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const queryParam = searchParams.get('flash');
    if (!queryParam) return;
    const [type, message] = queryParam.split(':');
    if (!type || !message) return;

    toast[getType(type)](message);

    const newParams = new URLSearchParams(searchParams);
    newParams.delete('flash');
    router.replace(`${pathname}?${newParams.toString()}`);
  }, [pathname, router, searchParams]);
  return <Toaster position="top-center" richColors />;
}
