import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

let adapter: any;
try {
	const auto = await import('@sveltejs/adapter-auto');
	adapter = auto.default;
} catch {
	// fallback if needed
}

export default defineConfig({
	server: {
		port: 5174,
		strictPort: false
	},
	preview: {
		port: 5174
	},
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter ? adapter() : undefined,
			dynamicCompileOptions: ({ filename }: { filename: string }) =>
				filename.includes('node_modules') ? undefined : { runes: true }
		})
	]
});
