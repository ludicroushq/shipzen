'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { setCookie } from 'cookies-next';
import ms from 'ms';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { errorMap } from 'zod-validation-error';
import { authCreateInputSchema } from '@/auth/server/routers/auth/create/schema';
import { trpcReactQuery } from '@/app/(app)/_utils/trpc/react-query';
import { AUTH_EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_MINUTES } from '@/auth/server/routers/auth/create/constants';
import { AUTH_VERIFICATION_CODE_COOKIE_NAME } from '../../_utils/constants';

export function Auth() {
  const mutation = trpcReactQuery.auth.create.useMutation();
  const form = useForm<z.infer<typeof authCreateInputSchema>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(authCreateInputSchema, { errorMap }),
  });
  const router = useRouter();

  useEffect(() => {
    form.setFocus('email');
  }, [form]);

  async function onSubmit(data: z.infer<typeof authCreateInputSchema>) {
    const response = await mutation.mutateAsync(data);
    const { code } = response;
    setCookie(AUTH_VERIFICATION_CODE_COOKIE_NAME, code, {
      expires: new Date(
        Date.now() + ms(`${AUTH_EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_MINUTES}m`),
      ),
      secure: true,
    });
    router.push('/auth/verify');
  }

  return (
    <form
      className="space-y-2"
      onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field }) => (
          <Input
            fullWidth
            label="Email Address"
            size="lg"
            type="email"
            variant="bordered"
            errorMessage={form.formState.errors.email?.message?.toString()}
            {...field}
          />
        )}
      />
      <Button
        color="primary"
        fullWidth
        size="lg"
        type="submit"
        isLoading={form.formState.isSubmitting}
      >
        Continue
      </Button>
    </form>
  );
}
