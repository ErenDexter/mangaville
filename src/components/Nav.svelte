<script>
	import { onMount } from 'svelte';
	let mounted = false;
	onMount(() => {
		mounted = true;
		console.log(localStorage.getItem('recentLink'));
	});
</script>

<nav
	class="flex w-full text-sm font-normal z-50 items-center justify-center lg:justify-between text-white fixed uppercase"
	style="background-color: rgba(17, 24, 39, 0.8)"
>
	<div class="flex space-x-7 p-2.5 lg:pl-7 items-center">
		<a href="/" class="text-3xl font-bold pr-5 lg:pr-7 border-r mr-1 border-white text-white">MV</a>
		<a href="/" class="lg:px-3 hover:text-gray-500">Home</a>
		<div
			on:click={() => {
				if (mounted)
					window.location.href =
						localStorage.getItem('recentLink') == null
							? '/recent'
							: localStorage.getItem('recentLink');
			}}
			class="pr-3 cursor-pointer hover:text-gray-500"
		>
			Recent
		</div>
	</div>
	<div class="pr-3 lg:pr-10">
		<a
			class="lg:flex justify-center hover:text-gray-500"
			href="https://www.youtube.com/channel/UC4GLMq65Rt5FjJxRtFra1Cg"
			target="_blank"><div>Youtube</div></a
		>
	</div>
</nav>
