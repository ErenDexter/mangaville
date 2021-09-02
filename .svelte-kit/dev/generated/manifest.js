const c = [
	() => import("..\\..\\..\\src\\routes\\__layout.svelte"),
	() => import("..\\components\\error.svelte"),
	() => import("..\\..\\..\\src\\routes\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\Terms-And-Conditions.svelte"),
	() => import("..\\..\\..\\src\\routes\\Privacy-Policy.svelte"),
	() => import("..\\..\\..\\src\\routes\\recent.svelte"),
	() => import("..\\..\\..\\src\\routes\\debug.svelte"),
	() => import("..\\..\\..\\src\\routes\\[mangaId]\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\[mangaId]\\[chapterId]\\index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/Terms-And-Conditions.svelte
	[/^\/Terms-And-Conditions\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/Privacy-Policy.svelte
	[/^\/Privacy-Policy\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/mv-api/chapter/[source]/[manga]/[link].js
	[/^\/mv-api\/chapter\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/],

	// src/routes/mv-api/manga/[source]/[manga]/[link].js
	[/^\/mv-api\/manga\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/],

	// src/routes/recent.svelte
	[/^\/recent\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/robots.txt
	[/^\/robots\/?$/],

	// src/routes/debug.svelte
	[/^\/debug\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/[mangaId]/index.svelte
	[/^\/([^/]+?)\/?$/, [c[0], c[7]], [c[1]], (m) => ({ mangaId: d(m[1])})],

	// src/routes/[mangaId]/[chapterId]/index.svelte
	[/^\/([^/]+?)\/([^/]+?)\/?$/, [c[0], c[8]], [c[1]], (m) => ({ mangaId: d(m[1]), chapterId: d(m[2])})]
];

export const fallback = [c[0](), c[1]()];