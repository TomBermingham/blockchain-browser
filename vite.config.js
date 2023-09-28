import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
        exclude: ["codemirror", "@codemirror/language-javascript", "@codemirror/state", "@codemirror/language-html" /* ... */],
    }
});

const config = {
    //...
    optimizeDeps: {
        exclude: ["codemirror", "@codemirror/language-javascript", "@codemirror/state", "@codemirror/language-html" /* ... */],
    },
    //...
}