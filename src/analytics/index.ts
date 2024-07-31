import analyticsJS from 'analytics';
import packageJson from '../../package.json';

const _analytics = analyticsJS({
	app: packageJson.name,
	plugins: [],
});

type Track = {
	getStarted: {
		path: string;
	};
};
function createAnalytics() {
	function track<Key extends keyof Track>(
		name: Key,
		data: Track[Key],
		...restArguments: any[]
	) {
		void _analytics.track(name, data, ...restArguments); // eslint-disable-line @typescript-eslint/no-unsafe-argument
	}

	return {
		..._analytics,
		track,
	};
}

export const analytics = createAnalytics();
