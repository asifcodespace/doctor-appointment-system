import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

let adapter: any;
try {
	const netlify = await import('@sveltejs/adapter-netlify');
	adapter = netlify.default;
} catch {
	const auto = await import('@sveltejs/adapter-auto');
	adapter = auto.default;
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter(),
			alias: { '$lib': 'src/lib' },
			dynamicCompileOptions: ({ filename }: { filename: string }) =>
				filename.includes('node_modules') ? undefined : { runes: true }
		})
	]
});
