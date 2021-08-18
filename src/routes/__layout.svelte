<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<Nav />
<slot />
<Footer />

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
