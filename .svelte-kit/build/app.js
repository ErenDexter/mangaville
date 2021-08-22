import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t<meta\n\t\t\tname=\"description\"\n\t\t\tcontent=\"Read lastest manga online for free at mangaville.xyz. Mangaville is the largest village of most popular, latest & trending manga. You can read manga online in hd quality for completely free. Mangaville is the fastest and we can assure you that you will get your favourite manga first. Also Mangaville is almost ad free. There is no Pop-Ups or Redirects to annoy you. Read Manga with Mangaville in an Otaku way.\"\n\t\t/>\n\t\t<meta property=\"og:type\" content=\"article\" />\n\t\t<meta property=\"og:title\" content=\"MangaVille - Read Lastest Manga Online\" />\n\t\t<meta\n\t\t\tproperty=\"og:description\"\n\t\t\tcontent=\"Mangaville is the largest village of most popular, latest & trending manga. You can read manga online in hd quality for completely free.\"\n\t\t/>\n\t\t<meta property=\"og:image\" content=\"/cover.jpg\" />\n\t\t<meta property=\"og:site_name\" content=\"MangaVille\" />\n\t\t" + head + "\n\t\t<style>\n\t\t\tbody::-webkit-scrollbar {\n\t\t\t\twidth: 5px;\n\t\t\t}\n\n\t\t\tbody::-webkit-scrollbar-track {\n\t\t\t\tbackground-color: #111827;\n\t\t\t}\n\n\t\t\tbody::-webkit-scrollbar-thumb {\n\t\t\t\tbackground-color: #8b5cf6;\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body style=\"background-color: #111827\">\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let options = null;

const default_settings = { paths: {"base":"","assets":"/."} };

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/./_app/start-491bfaa3.js",
			css: ["/./_app/assets/start-8077b9bf.css"],
			js: ["/./_app/start-491bfaa3.js","/./_app/chunks/vendor-81fef714.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => "/./_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: /** @param {Error & {frame?: string}} error */ (error) => {
			if (error.frame) {
				console.error(error.frame);
			}
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		service_worker: null,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":"Boruto.jpg","size":99319,"type":"image/jpeg"},{"file":"cover.jpg","size":220749,"type":"image/jpeg"},{"file":"Dr.-Stone.jpg","size":341218,"type":"image/jpeg"},{"file":"favicon.png","size":16794,"type":"image/png"},{"file":"Jujutsu-Kaisen.jpg","size":191761,"type":"image/jpeg"},{"file":"One-Piece.jpg","size":307593,"type":"image/jpeg"},{"file":"One-Punch-Man.jpg","size":178537,"type":"image/jpeg"},{"file":"Tokyo-Ghoul.jpg","size":288997,"type":"image/jpeg"}],
	layout: "src/routes/__layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'endpoint',
						pattern: /^\/mv-api\/chapter\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
						params: (m) => ({ source: d(m[1]), manga: d(m[2]), link: d(m[3])}),
						load: () => import("..\\..\\src\\routes\\mv-api\\chapter\\[source]\\[manga]\\[link].js")
					},
		{
						type: 'endpoint',
						pattern: /^\/mv-api\/manga\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
						params: (m) => ({ source: d(m[1]), manga: d(m[2]), link: d(m[3])}),
						load: () => import("..\\..\\src\\routes\\mv-api\\manga\\[source]\\[manga]\\[link].js")
					},
		{
						type: 'page',
						pattern: /^\/recent\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/recent.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/debug\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/debug.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/([^/]+?)\/?$/,
						params: (m) => ({ mangaId: d(m[1])}),
						a: ["src/routes/__layout.svelte", "src/routes/[mangaId]/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/([^/]+?)\/([^/]+?)\/?$/,
						params: (m) => ({ mangaId: d(m[1]), chapterId: d(m[2])}),
						a: ["src/routes/__layout.svelte", "src/routes/[mangaId]/[chapterId]/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve }) => resolve(request)),
	serverFetch: hooks.serverFetch || fetch
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("..\\..\\src\\routes\\__layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components\\error.svelte"),"src/routes/index.svelte": () => import("..\\..\\src\\routes\\index.svelte"),"src/routes/recent.svelte": () => import("..\\..\\src\\routes\\recent.svelte"),"src/routes/debug.svelte": () => import("..\\..\\src\\routes\\debug.svelte"),"src/routes/[mangaId]/index.svelte": () => import("..\\..\\src\\routes\\[mangaId]\\index.svelte"),"src/routes/[mangaId]/[chapterId]/index.svelte": () => import("..\\..\\src\\routes\\[mangaId]\\[chapterId]\\index.svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"/./_app/pages/__layout.svelte-db98bff5.js","css":["/./_app/assets/pages/__layout.svelte-b187108b.css"],"js":["/./_app/pages/__layout.svelte-db98bff5.js","/./_app/chunks/vendor-81fef714.js","/./_app/chunks/Footer-82a7d451.js"],"styles":[]},".svelte-kit/build/components/error.svelte":{"entry":"/./_app/error.svelte-02faf4d0.js","css":[],"js":["/./_app/error.svelte-02faf4d0.js","/./_app/chunks/vendor-81fef714.js"],"styles":[]},"src/routes/index.svelte":{"entry":"/./_app/pages/index.svelte-6e605e39.js","css":[],"js":["/./_app/pages/index.svelte-6e605e39.js","/./_app/chunks/vendor-81fef714.js","/./_app/chunks/db-84123f5e.js"],"styles":[]},"src/routes/recent.svelte":{"entry":"/./_app/pages/recent.svelte-a781df69.js","css":[],"js":["/./_app/pages/recent.svelte-a781df69.js","/./_app/chunks/vendor-81fef714.js","/./_app/chunks/Footer-82a7d451.js"],"styles":[]},"src/routes/debug.svelte":{"entry":"/./_app/pages/debug.svelte-9feec32a.js","css":[],"js":["/./_app/pages/debug.svelte-9feec32a.js","/./_app/chunks/vendor-81fef714.js"],"styles":[]},"src/routes/[mangaId]/index.svelte":{"entry":"/./_app/pages/[mangaId]/index.svelte-2f65842e.js","css":[],"js":["/./_app/pages/[mangaId]/index.svelte-2f65842e.js","/./_app/chunks/vendor-81fef714.js","/./_app/chunks/stores-eea8dfe9.js","/./_app/chunks/db-84123f5e.js"],"styles":[]},"src/routes/[mangaId]/[chapterId]/index.svelte":{"entry":"/./_app/pages/[mangaId]/[chapterId]/index.svelte-60b85ce8.js","css":["/./_app/assets/pages/[mangaId]/[chapterId]/index.svelte-e0cbf582.css"],"js":["/./_app/pages/[mangaId]/[chapterId]/index.svelte-60b85ce8.js","/./_app/chunks/vendor-81fef714.js","/./_app/chunks/stores-eea8dfe9.js","/./_app/chunks/db-84123f5e.js"],"styles":[]}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}