import {queueConnection} from './connection';
import {createQueues} from './utils/create-queues';

export const queues = createQueues({
	connection: queueConnection,
});

// Example: queues.helloWorld.add("hello-world", { name: "world" });
