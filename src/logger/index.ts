import { isDev } from '@/config/node';
import type { ILogObj } from 'tslog';
import { Logger } from 'tslog';

export const logger = new Logger<ILogObj>({
  type: isDev ? 'pretty' : 'json',
  minLevel: 0,
});
