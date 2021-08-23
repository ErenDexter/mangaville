const c = [
	() => import("..\\..\\..\\src\\routes\\__layout.svelte"),
	() => import("..\\components\\error.svelte"),
	() => import("..\\..\\..\\src\\routes\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\policy.svelte"),
	() => import("..\\..\\..\\src\\routes\\recent.svelte"),
	() => import("..\\..\\..\\src\\routes\\debug.svelte"),
	() => import("..\\..\\..\\src\\routes\\[mangaId]\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\[mangaId]\\[chapterId]\\index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/mv-api/chapter/[source]/[manga]/[link].js
	[/^\/mv-api\/chapter\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/],

	// src/routes/mv-api/manga/[source]/[manga]/[link].js
	[/^\/mv-api\/manga\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/],

	// src/routes/policy.svelte
	[/^\/policy\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/recent.svelte
	[/^\/recent\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/debug.svelte
	[/^\/debug\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/[mangaId]/index.svelte
	[/^\/([^/]+?)\/?$/, [c[0], c[6]], [c[1]], (m) => ({ mangaId: d(m[1])})],

	// src/routes/[mangaId]/[chapterId]/index.svelte
	[/^\/([^/]+?)\/([^/]+?)\/?$/, [c[0], c[7]], [c[1]], (m) => ({ mangaId: d(m[1]), chapterId: d(m[2])})]
];

export const fallback = [c[0](), c[1]()];