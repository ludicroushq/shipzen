import {type ILogObj, Logger} from 'tslog';
import {isDev} from '@/config/node';

export const logger = new Logger<ILogObj>({
	type: isDev ? 'pretty' : 'json',
	minLevel: 0,
});
