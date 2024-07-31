import {GetStarted} from './get-started';
import {signInAction} from '@/auth/actions';

export default function Home() {
	return (
		<section className="container mx-auto mt-12">
			<div className="prose prose-lg">
				<h1>TODO</h1>
				<p>TODO</p>
				<form action={signInAction}>
					<GetStarted />
				</form>
			</div>
		</section>
	);
}
