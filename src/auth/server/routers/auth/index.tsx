import { router } from '@/server/trpc';
import { create } from './create';
import { verify } from './verify';
import { destroy } from './destroy';

export const authRouter = router({
  create,
  verify,
  destroy,
});
