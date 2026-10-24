let adapter;
try {
	({ default: adapter } = await import('@sveltejs/adapter-netlify'));
} catch {
	({ default: adapter } = await import('@sveltejs/adapter-auto'));
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) =>
			filename.includes('node_modules') ? undefined : { runes: true }
	}
};

export default config;
