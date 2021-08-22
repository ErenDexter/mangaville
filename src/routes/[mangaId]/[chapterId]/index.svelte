<script>
	import { page } from '$app/stores';
	import axios from 'axios';
	import { store } from '../../../database/db';
	import { onMount, onDestroy } from 'svelte';

	const { mangaId, chapterId } = $page.params;
	const manga = mangaId.replace(/-/g, ' ');

	const { title, cover, link, source } = $store.mangas.filter((el) => el.title === manga)[0];

	let chapterInfo,
		chapterName = '',
		id = '',
		chapterLink,
		autoScroll = false,
		paused = true,
		interVal,
		speed = 10;

	$: {
		console.log(autoScroll);
		scroll();
	}

	onMount(() => {
		localStorage.setItem('recentLink', window.location.pathname);
		loadStuff();
	});

	onDestroy(() => {
		clearInterval(interVal);
	});

	function scroll() {
		if (autoScroll) {
			interVal = setInterval(function () {
				if (paused) clearInterval(interVal);
				else window.scrollBy(0, 1);
			}, 21 - speed);
		} else clearInterval(interVal);
	}

	const loadStuff = async () => {
		if ($store[mangaId]) {
			console.log('Manga ID exists in store.');
			chapterInfo = [...$store[mangaId]];
			chapterName = chapterInfo[chapterId - 1].chapterName;
			chapterLink = chapterInfo[chapterId - 1].chapterLink;
			id = chapterInfo[chapterId - 1].chapterId;
			const newLink = chapterLink.replace(/\//g, ',');
			console.log('Loading chapters...');
			console.log(`../mv-api/chapter/${source}/${mangaId}/${newLink}`);
			try {
				const res = await axios.get(`../mv-api/chapter/${source}/${mangaId}/${newLink}`);
				chapter = res.data;
				console.log(chapter);
			} catch (error) {
				console.log('Ooopss! Error occurred.');
			}
		} else {
			console.log('Manga ID does not exist in store.');
			const newLink = link.replace(/\//g, ',');
			let res = await axios.get(`../mv-api/manga/${source}/${mangaId}/${newLink}`);
			store.update((currentData) => {
				return { [mangaId]: res.data.chapters.reverse(), ...currentData };
			});
			chapterInfo = [...$store[mangaId]];
			chapterName = chapterInfo[chapterId - 1].chapterName;
			chapterLink = chapterInfo[chapterId - 1].chapterLink;
			id = chapterInfo[chapterId - 1].chapterId;
			const newChapterLink = chapterLink.replace(/\//g, ',');
			res = await axios.get(`../mv-api/chapter/${source}/${mangaId}/${newChapterLink}`);
			chapter = res.data;
		}
	};

	let chapter = { title: '', images: [] };
</script>

<svelte:head>
	<title>Chapter {id} - {title}</title>

	<meta property="og:type" content="article" />
	<meta property="og:title" content="MangaVille - Read {title} Chapter {id}" />
	<meta
		property="og:description"
		content="MangaVille is the largest village of most popular, latest & trending manga. You can read manga online in hd quality for completely free."
	/>
	<meta property="og:image" content="../../{cover}" />
	<meta property="og:site_name" content="MangaVille" />
</svelte:head>

<div class="text-2xl mt-30 text-white">
	<div
		class="flex justify-center mx-auto w-full h-auto bg-center bg-cover bg-no-repeat px-2"
		style="background-image: url('../../{cover}'); "
	>
		<h1
			class="my-72 text-3xl lg:text-6xl border-2 px-6 lg:py-4 py-3 font-medium text-white uppercase"
			style="background-color: rgba(0, 0, 0, 0.6);"
		>
			{title}<br />
			<span class="text-xl lg:text-3xl flex justify-center mt-2 font-medium">Chapter {id}</span>
		</h1>
	</div>
</div>
{#if chapter.images.length > 0}
	{#if autoScroll}
		<div class="fixed bottom-5 right-5">
			<button
				class="rounded-full p-3 bg-primary"
				on:click={() => {
					console.log(speed);
					if (paused) {
						paused = false;
						scroll();
					} else {
						clearInterval(interVal);
						paused = true;
					}
				}}
				>{#if paused}<svg
						class="h-6 w-6 text-white"
						viewBox="0 0 24 24"
						fill="white"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polygon points="5 3 19 12 5 21 5 3" /></svg
					>{:else}<svg
						class="h-6 w-6 text-white"
						viewBox="0 0 24 24"
						fill="white"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect x="6" y="4" width="4" height="16" />
						<rect x="14" y="4" width="4" height="16" /></svg
					>{/if}</button
			>
		</div>
	{/if}
	<div
		class="flex flex-col text-lg text-white lg:flex-row gap-5 items-center justify-center w-full mb-8 mt-10"
	>
		<label for="toggle" class="flex items-center cursor-pointer">
			<div class="relative">
				<input type="checkbox" bind:checked={autoScroll} id="toggle" class="sr-only" />

				<div class="block bg-gray-800 w-14 h-8 rounded-full" />

				<div
					class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300"
				/>
			</div>

			<div class="ml-3 ">Auto Scroll</div>
		</label>

		<div class="has-tooltip">
			<label>
				<span class="tooltip  rounded shadow-lg py-0.5 bg-gray-800 text-primary px-2 -mt-8"
					>{speed}</span
				>

				<input
					class="rounded-lg overflow-hidden appearance-none bg-gray-800 h-3 w-40 cursor-pointer"
					type="range"
					min="1"
					max="20"
					step="1"
					bind:value={speed}
				/> &nbsp;Speed</label
			>
		</div>
	</div>

	<div class="text-2xl text-white mt-6 flex items-center space-x-4 justify-center">
		<div
			on:click={() => (window.location.href = `/${mangaId}/${Number(chapterId) - 1}`)}
			class="hover:opacity-60 transition duration-300 ease-in-out cursor-pointer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				role="img"
				width="2em"
				height="2em"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
				><g transform="rotate(180 12 12)"
					><g fill="none"
						><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1zM9.793 8.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L13.086 12L9.793 8.707z"
							fill="#8b5cf6"
						/></g
					></g
				></svg
			>
		</div>
		<div>CHAPTER {id}</div>
		<div
			on:click={() => (window.location.href = `/${mangaId}/${Number(chapterId) + 1}`)}
			class="hover:opacity-60 transition duration-300 ease-in-out cursor-pointer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				role="img"
				width="2em"
				height="2em"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
				><g fill="none"
					><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1zM9.793 8.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L13.086 12L9.793 8.707z"
						fill="#8b5cf6"
					/></g
				></svg
			>
		</div>
	</div>

	<div class="text-base font-light mt-2 text-white px-4 flex justify-center">
		{chapterName}
	</div>
	<div class="w-20 h-1 bg-primary mx-auto mt-5" />
	<div class="flex flex-col items-center mt-8">
		{#each chapter.images as image, i}
			<img src={image} alt={chapterName} class="lg:w-1/2" />
			<div class="my-2 text-white">{i + 1}/{chapter.images.length}</div>
		{/each}
	</div>

	<div class="text-2xl text-white mt-6 flex items-center space-x-4 justify-center">
		<div
			on:click={() => (window.location.href = `/${mangaId}/${Number(chapterId) - 1}`)}
			class="hover:opacity-60 transition duration-300 ease-in-out cursor-pointer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				role="img"
				width="2em"
				height="2em"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
				><g transform="rotate(180 12 12)"
					><g fill="none"
						><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1zM9.793 8.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L13.086 12L9.793 8.707z"
							fill="#8b5cf6"
						/></g
					></g
				></svg
			>
		</div>
		<div>CHAPTER {id}</div>
		<div
			on:click={() => (window.location.href = `/${mangaId}/${Number(chapterId) + 1}`)}
			class="hover:opacity-60 transition duration-300 ease-in-out cursor-pointer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				role="img"
				width="2em"
				height="2em"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
				><g fill="none"
					><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1zM9.793 8.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L13.086 12L9.793 8.707z"
						fill="#8b5cf6"
					/></g
				></svg
			>
		</div>
	</div>
{:else}
	<div
		class="w-full h-40 animate-bounce mt-5 flex justify-center items-center text-white text-2xl font-light"
	>
		Chapter {id}
	</div>
{/if}

<style>
	input:checked ~ .block {
		background-color: #8b5cf6;
	}
	input:checked ~ .dot {
		transform: translateX(100%);
	}
	input[type='range']::-webkit-slider-thumb {
		width: 20px;
		-webkit-appearance: none;
		appearance: none;
		height: 20px;
		background: white;
		box-shadow: -405px 0 0 400px #8b5cf6;
		border-radius: 50%;
	}
	.tooltip {
		display: none;
		position: absolute;
		left: 53%;
	}

	.has-tooltip:hover .tooltip {
		display: block;
		z-index: 50;
	}
</style>
