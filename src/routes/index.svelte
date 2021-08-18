<script>
	import { store } from '../database/db';
</script>

<svelte:head>
	<title>MangaVille</title>
</svelte:head>
<div
	class="flex justify-center mx-auto w-full h-auto bg-cover bg-no-repeat px-2"
	style="background-image: url('cover.jpg'); "
>
	<h1
		class="my-72 text-3xl lg:text-6xl border-2 px-6 lg:py-4 py-3 font-medium text-white uppercase"
		style="background-color: rgba(0, 0, 0, 0.6);"
	>
		M A N G A V I L L E
	</h1>
</div>
<div class="px-4 lg:px-20 text-white">
	<h2 class="mt-8 text-lg">
		<span class="text-4xl font-bold uppercase">Read</span><br /> Action, adventure, fantasy, mystery,
		romance and more—thousands of manga volumes for every fan!
	</h2>
	<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-10 items-stretch ">
		{#each $store.mangas as manga}
			<a href="/{manga.title.replace(/ /g, '-')}"
				><div
					class="grid grid-cols-2 hover:-translate-y-2 transition duration-300 ease-in-out hover:opacity-60"
				>
					<div class="rounded-md">
						<img
							src={manga.cover}
							class="object-cover object-center rounded w-full h-full"
							alt={manga.title}
						/>
					</div>
					<div
						class="px-3 py-2 overflow-ellipsis overflow-hidden rounded-tr-md rounded-br-md border-t-2 border-r-2 border-b-2 border-gray-800"
					>
						<h3 class="text-xl font-medium truncate">{manga.title}</h3>
						<p class="font-medium text-base">{manga.duration}</p>
						<p class="truncate text-sm">{manga.genre}</p>
						<a href="/{manga.title.replace(/ /g, '-')}" class="uppercase text-primary"
							>Read <span class="text-xl">›</span></a
						>
						<br />
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
