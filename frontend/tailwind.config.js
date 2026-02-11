/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                mint: {
                    500: '#00C896',
                    600: '#00A87E',
                }
            }
        },
    },
    plugins: [],
}
