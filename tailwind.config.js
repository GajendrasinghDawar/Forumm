import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import {
    gray,
    red,
    grass,
    sand,
    tomato,
    amber,
    jade,
    iris,
    blackA,
    whiteA
} from '@radix-ui/colors';
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                inter: [ 'Inter', ...defaultTheme.fontFamily.sans ],
                playwrite: [ 'Playwrite HR Lijeva', ...defaultTheme.fontFamily.sans ]
            },
            colors: {
                gray,
                sand,

                iris,
                amber,

                grass,
                jade,

                red,
                tomato,
                blackA,
                whiteA
            },
        },
    },

    plugins: [forms],
};
