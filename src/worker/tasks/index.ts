import {type Task} from '../utils/create-workers';
import {helloWorld} from './hello-world';

export const tasks = {
	helloWorld,
} satisfies Record<string, Task>;
