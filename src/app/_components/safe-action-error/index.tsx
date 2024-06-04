import { AlertCircleIcon } from 'lucide-react';
import type { HookResult } from 'next-safe-action/hooks';
import { Alert, AlertDescription, AlertTitle } from '@/shadcn/ui/alert';

export type SafeActionErrorProps = {
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
    <Alert variant="destructive">
      <AlertCircleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
