/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'primary-green': '#8ec76f',
				'primary-green-hover': '#5cae30',
				'off-green': '#6b9654',
				'form-gray': '#EBEBEB',
			},
			boxShadow: {
				input: '1px 2px 5px rgba(0, 0, 0, 0.1)',
				form: '1px 2px 5px rgba(0, 0, 0, 0.3);',
			},
		},
	},
	plugins: [],
};
