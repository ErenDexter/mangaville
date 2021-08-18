module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.svelte'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: '#8B5CF6'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
