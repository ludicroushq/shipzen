import Analytics from "analytics";
import packageJson from "../../package.json";

const _analytics = Analytics({
  app: packageJson.name,
  plugins: [],
});

type Track = {
  getStarted: {
    path: string;
  };
};
function createAnalytics() {
  function track<Key extends keyof Track>(name: Key, data: Track[Key], ...restArguments: any[]) {
    _analytics.track(name, data, ...restArguments);
  }

  return {
    ..._analytics,
    track,
  };
}

export const analytics = createAnalytics();
