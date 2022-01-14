// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

/* TODO: Remove themes after testing  */
import "./themes/dokk1.css"
//import "./themes/blixen.css"
//import "./themes/mso.css"
//import "./themes/aarhus.css"

const GlobalStyles = createGlobalStyle`
  /*
  * We use the classes horizontal and vertical to define the orientation of the screen.
  * This is calculated and added through the slide template component.
  */

  /* Common template variables */
  html {
    /*
    * Colors
    */
    --color-white: #fff;
    --color-grey-100: hsl(0deg 0% 90%);
    --color-grey-200: hsl(0deg 0% 85%);
    --color-grey-300: hsl(0deg 0% 80%);
    --color-grey-400: hsl(0deg 0% 75%);
    --color-grey-500: hsl(0deg 0% 70%);
    --color-grey-600: hsl(0deg 0% 40%);
    --color-grey-700: hsl(0deg 0% 30%);
    --color-grey-800: hsl(0deg 0% 20%);
    --color-grey-900: hsl(0deg 0% 10%);
    @media (prefers-color-scheme: dark) {
      --color-grey-100: hsl(0deg 0% 10%);
      --color-grey-200: hsl(0deg 0% 15%);
      --color-grey-300: hsl(0deg 0% 20%);
      --color-grey-400: hsl(0deg 0% 25%);
      --color-grey-500: hsl(0deg 0% 30%);
      --color-grey-600: hsl(0deg 0% 45%);
      --color-grey-700: hsl(0deg 0% 60%);
      --color-grey-800: hsl(0deg 0% 75%);
      --color-grey-900: hsl(0deg 0% 90%);
    }
    --color-black: #000;
    --color-blue: hsl(219deg 89% 57%);
    --color-indigo: indigo;
    --color-purple: purple;
    --color-pink: pink;
    --color-red: red;
    --color-orange: orange;
    --color-yellow: yellow;
    --color-green: green;
    --color-teal: teal;
    --color-cyan: cyan;
    --color-gray: var(--color-grey-500);
    --color-gray-dark: var(--color-grey-900);
    --color-primary: var(--color-blue);
    --color-secondary: var(--color-orange);
    --color-success: var(--color-green);
    --color-info: var(--color-teal);
    --color-warning: var(--color-yellow);
    --color-danger: var(--color-red);
    --color-light: var(--color-white);
    --color-dark: var(--color-black);
    --bg-light: var(--color-light);
    --bg-dark: var(--color-dark);
    --bg-primary: var(--color-primary);
    --bg-secondary: var(--color-secondary);
    --bg-transparent: transparent;
    --text-light: var(--color-light);
    --text-dark: var(--color-dark);

    /*
    * Fonts
    */
    --font-family-base: system-ui, -apple-system, Roboto, "Helvetica Neue", Arial,
      sans-serif;
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-bold: 700;

    /*
    * Line height
    */
    --line-height-base: 1.5;
    --line-height-sm: 1.25;
    --line-height-lg: 2;

    /*
    * Sizes
    */
    --font-size-base: 1rem; // Assumes the browser default, typically 16px
    --font-size-sm: calc(var(--font-size-base) * 0.875);
    --font-size-lg: calc(var(--font-size-base) * 1.25);
    --font-size-xl: calc(var(--font-size-base) * 1.5);
    --h1-font-size: calc(var(--font-size-base) * 2.5);
    --h2-font-size: calc(var(--font-size-base) * 2);
    --h3-font-size: calc(var(--font-size-base) * 1.75);
    --h4-font-size: calc(var(--font-size-base) * 1.5);
    --h5-font-size: calc(var(--font-size-base) * 1.25);
    --h6-font-size: calc(var(--font-size-base));

    /*
    * Spacing
    */
    --spacer: 12px;
    --margin-size-base: calc(var(--spacer) * 3);
    --padding-size-base: calc(var(--spacer) * 3);

    /*
    * Shadow
    */
    --box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    --box-shadow-sm: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    --box-shadow-lg: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    --box-shadow-inset: inset 0 1px 2px rgba(0, 0, 0, 0.075);

    /*
    * Border
    */
    --border-size: 1px;
    --border-style: solid;
    --border-color: var(--color-grey-900);
    @media (prefers-color-scheme: dark) {
      --border-color: var(--color-light);
    }
    --border: var(--border-size) var(--border-style) var(--border-color);


    /*
    * Light / Dark mode
    */
    --background-color: var(--bg-light, hsl(0deg, 0%, 100%));
    --text-color: var(--text-dark, hsl(0deg, 0%, 0%));


  }

  /* Basic resets */
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html {
    font-size: 1.125rem;
    height: 100%;

    /* Color defaults */
    background-color: var(--background-color);
    color: var(--text-color);
  }
  body {
    margin: 0;
    height: 100%;
  }

  @media (prefers-color-scheme: dark) {
    html {
      --background-color: var(--bg-dark, hsl(0deg, 0%, 10%));
      --text-color: var(--text-light, hsl(0deg, 0%, 100%));
    }
  }

`;
export default GlobalStyles;