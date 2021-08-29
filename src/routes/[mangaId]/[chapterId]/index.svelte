<script>
	import { page } from '$app/stores';
	import axios from 'axios';
	import { store } from '../../../database/db';
	import { onMount, onDestroy } from 'svelte';
	import { slide, fade } from 'svelte/transition';
	import RightArrow from '../../../components/RightArrow.svelte';
	import LeftArrow from '../../../components/LeftArrow.svelte';
	import UpArrow from '../../../components/UpArrow.svelte';

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
		showList = false,
		speed = 10,
		comingSoon = false,
		back2Top = false;

	$: {
		console.log(autoScroll);
		scroll();
	}

	onMount(() => {
		localStorage.setItem('recentLink', window.location.pathname);
		loadStuff();
		document.addEventListener('mouseup', function (e) {
			let container = document.getElementById('list');
			let listBtn = document.getElementById('listBtn');
			if (!container.contains(e.target)) {
				showList = false;
			}
			if (listBtn.contains(e.target)) {
				showList = !showList;
			}
		});
		window.addEventListener('scroll', function () {
			if (window.pageYOffset > 1000) {
				back2Top = true;
			} else back2Top = false;
		});
	});

	onDestroy(() => {
		clearInterval(interVal);
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

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

			try {
				const res = await axios.get(`../mv-api/chapter/${source}/${mangaId}/${newLink}`);
				chapter = await res.data;
				if (chapter.images.length == 0) {
					comingSoon = true;
				}
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
			const newChapterLink = await chapterLink.replace(/\//g, ',');
			res = await axios.get(`../mv-api/chapter/${source}/${mangaId}/${newChapterLink}`);
			chapter = await res.data;
			if (chapter.images.length == 0) {
				comingSoon = true;
			}
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
<div>
	<div class="text-2xl mt-30 text-white">
		<div
			class="flex justify-center mx-auto w-full h-auto bg-center bg-cover bg-no-repeat px-2"
			style="background-image: url('../../{cover}'); "
		>
			<a href="/{title.split(' ').join('-')}" class="cursor-pointer"
				><h1
					class="cursor-pointer my-72 text-3xl lg:text-6xl border-2 px-6 lg:py-4 py-3 font-medium text-white uppercase"
					style="background-color: rgba(0, 0, 0, 0.6);"
				>
					{title}<br />
					<span class="text-xl lg:text-3xl flex justify-center mt-2 font-medium">Chapter {id}</span>
				</h1></a
			>
		</div>
	</div>
	{#if chapter.title !== ''}
		{#if autoScroll}
			<div transition:fade class="fixed bottom-5 right-5">
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
		{#if back2Top && paused}
			<div transition:fade class="fixed bottom-20 right-5">
				<button class="rounded-full p-3 bg-primary" on:click={() => scrollToTop()}>
					<UpArrow />
				</button>
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
			{#if chapterId > 1}
				<div
					on:click={() => (window.location.href = `/${mangaId}/${Number(chapterId) - 1}`)}
					class="hover:opacity-60 transition duration-300 ease-in-out cursor-pointer"
				>
					<LeftArrow />
				</div>
			{/if}

			<div class="flex flex-row items-center">
				<div>CHAPTER {id}</div>
				<div class="ml-2 cursor-pointer" id="listBtn" on:click={() => (showList = !showList)}>
					<svg
						class="transition duration-300 ease-in-out"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						aria-hidden="true"
						role="img"
						width="1.01em"
						height="1em"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 616 614"
						><path
							d="M602.442 200l-253 317c-24 29-61 29-84 0l-253-317c-24-30-12-53 25-53h540c38 0 49 23 25 53z"
							fill={showList ? '#8B5CF6' : 'white'}
						/></svg
					>
				</div>
			</div>

			{#if chapterId < chapterInfo.length}
				<div
					on:click={() => (window.location.href = `/${mangaId}/${Number(chapterId) + 1}`)}
					class="hover:opacity-60 transition duration-300 ease-in-out cursor-pointer"
				>
					<RightArrow />
				</div>
			{/if}
		</div>
		{#if showList}
			<div
				id="list"
				transition:slide
				class="listScroll transition duration-300 ease-in-out text-white shadow-2xl mt-3 bg-gray-900 border border-white rounded-md flex items-center w-60 h-96 flex-col absolute  left-1/2 transform -translate-x-1/2 py-1 overflow-y-auto"
			>
				{#each chapterInfo as chapter, i}
					<div
						on:click={() => (window.location.href = `/${mangaId}/${i + 1}`)}
						class="py-2 text-center text-lg cursor-pointer w-full hover:bg-primary hover:text-gray-900"
					>
						CHAPTER {chapter.chapterId}
					</div>
				{/each}
			</div>
		{/if}

		{#if comingSoon !== true}
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
				{#if chapterId > 1}
					<div
						on:click={() => (window.location.href = `/${mangaId}/${Number(chapterId) - 1}`)}
						class="hover:opacity-60 transition duration-300 ease-in-out cursor-pointer"
					>
						<LeftArrow />
					</div>
				{/if}

				<div>CHAPTER {id}</div>

				{#if chapterId < chapterInfo.length}
					<div
						on:click={() => (window.location.href = `/${mangaId}/${Number(chapterId) + 1}`)}
						class="hover:opacity-60 transition duration-300 ease-in-out cursor-pointer"
					>
						<RightArrow />
					</div>
				{/if}
			</div>
		{:else}
			<div class="flex justify-center text-white text-4xl mt-10 font-extralight">Coming Soon!</div>
		{/if}
	{:else}
		<div
			class="w-full h-40 animate-bounce mt-5 flex justify-center items-center text-white text-2xl font-light"
		>
			Chapter {id}
		</div>
	{/if}
</div>

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

	.listScroll::-webkit-scrollbar {
		width: 5px;
	}

	.listScroll::-webkit-scrollbar-track {
		background-color: #111827;
	}

	.listScroll::-webkit-scrollbar-thumb {
		background-color: #8b5cf6;
	}
</style>
