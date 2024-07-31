import type {Job} from 'bullmq';

type Data = {
	name: string;
};
export async function helloWorld(job: Job<Data>) {
	const {name} = job.data;
	void job.log(`Hello ${name}!`);
}
