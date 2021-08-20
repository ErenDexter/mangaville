/** @type {import('@sveltejs/kit').Config} */
// import vercel from '@sveltejs/adapter-vercel';
// import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-vercel';
// import adapter from '@sveltejs/adapter-netlify';
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter()
	}
};

export default config;
