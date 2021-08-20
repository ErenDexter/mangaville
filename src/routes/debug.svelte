<script context="module">
	export const load = async ({ fetch }) => {
		const response = await fetch('mv-api/idkmanga/DrStone/https:,,dr-stone-online.com');
		// const json = await response.json();
		// console.log(json);
		const text = await response.text();
		console.log(text);
		
		return {
			props: {}
		};
	};
</script>

<script>
</script>

// muhahaha
