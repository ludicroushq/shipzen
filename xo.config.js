const config = {
	extends: ['plugin:@next/next/core-web-vitals'],
	ignore: 'next-env.d.ts',
	prettier: true,
	rules: {
		'import/extensions': 'off',
		'unicorn/prevent-abbreviations': 'off',
	},
};

export default config;
