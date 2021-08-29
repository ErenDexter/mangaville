<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { store } from '../../database/db';
	import axios from 'axios';

	const { mangaId } = $page.params;
	const manga = mangaId.replace(/-/g, ' ');

	const { title, genre, duration, description, cover, link, source } = $store.mangas.filter(
		(el) => el.title === manga
	)[0];

	let chunkState = 0;
	let chapter = [];

	onMount(() => {
		const newLink = link.replace(/\//g, ',');
		// mv-api/idkmanga/DrStone/https:,,dr-stone-online.com
		axios
			.get(`mv-api/manga/${source}/${mangaId}/${newLink}`)
			.then((res) => {
				store.update((currentData) => {
					return { [mangaId]: res.data.chapters.reverse(), ...currentData };
				});
			})
			.then(() => {
				const arr = [...$store[mangaId]];
				chapter = slicer(arr);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	function slicer(arr = []) {
		let newArr = [],
			i = 0;
		while (arr.length > 0) {
			const obj = {};
			const chunk = arr.splice(0, 100);
			if (chapter) {
				obj.chunk = chunk;
				obj.index = i;
				newArr.push(obj);
				i++;
			}
		}
		return newArr;
	}
	const options = {};
</script>

<svelte:head>
	<title>{title}</title>

	<meta property="og:type" content="article" />
	<meta property="og:title" content="MangaVille - Read {title}" />
	<meta
		property="og:description"
		content="MangaVille is the largest village of most popular, latest & trending manga. You can read manga online in hd quality for completely free."
	/>
	<meta property="og:image" content="/{cover}" />
	<meta property="og:site_name" content="MangaVille" />
</svelte:head>
<div>
	<div
		class="flex justify-center mx-auto w-full h-auto bg-center bg-cover bg-no-repeat px-2 "
		style="background-image: url({cover}); "
	>
		<h1
			class="my-72 text-3xl lg:text-6xl border-2 px-6 lg:py-4 py-3 font-medium text-white uppercase"
			style="background-color: rgba(0, 0, 0, 0.6);"
		>
			{title}
		</h1>
	</div>

	<div class="px-4 lg:px-20 text-white text-lg font-medium mt-6">
		<div>
			<h2 class="text-2xl uppercase">{title}</h2>
			<div class="text-sm text-primary font-medium uppercase">{duration}</div>
			<div class="text-sm uppercase">{genre}</div>
			<div class="text-lg text-left font-light mt-5">
				{description}
			</div>
		</div>
	</div>
	<div class="px-4 lg:px-20 text-white text-lg font-medium mt-6">
		<div class="w-20 h-1 bg-primary mx-auto mt-10" />
		{#if chapter.length !== 0}
			<div class="flex flex-wrap justify-center gap-3 mt-10">
				{#each chapter as chunkBtn}
					<button
						class="{chunkState == chunkBtn.index
							? 'bg-primary border-primary'
							: 'bg-gray-800 border-gray-800'} px-4 py-2  text-white rounded-md border-2 transition duration-300 ease-in-out  hover:border-primary"
						on:click={() => (chunkState = chunkBtn.index)}
					>
						{chunkBtn.chunk[0].chapterId} - {chunkBtn.chunk[chunkBtn.chunk.length - 1].chapterId}
					</button>
				{/each}
				<div class="w-full h-0.5 bg-primary mx-auto mt-2" />
				<div class="flex flex-wrap justify-center gap-2 mt-5">
					{#each chapter[chunkState].chunk as chap, i}
						<a href="/{mangaId}/{chunkState * 100 + i + 1}"
							><button
								class="w-16 lg:w-20 h-11 bg-gray-800 text-white rounded-md border-2 transition duration-300 ease-in-out border-gray-800 hover:border-primary"
							>
								{chap.chapterId}
							</button></a
						>
					{/each}
				</div>
			</div>
		{:else}
			<div
				class="w-full h-40 animate-bounce mt-5 flex justify-center items-center text-white text-2xl font-light"
			>
				{title}
			</div>
		{/if}
	</div>
</div>
