// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

/* TODO: Remove themes after testing  */
//import "./themes/dokk1.css"
//import "./themes/blixen.css"
//import "./themes/mso.css"
//import "./themes/aarhus.css"

const GlobalStyles = createGlobalStyle`
  /*
  * We use the classes horizontal and vertical to define the orientation of the screen.
  * This is calculated and added through the slide template component.
  */

  *, *::before, *::after {
    box-sizing: border-box;
  }
  html {
    font-size: 1.125rem;
  }
  body {
    margin: 0;
  }

  :root {
    /* Common variables */
    --font: var(--font-family-base, Arial, "sans-serif");
    --bg-color: var(--bg-dark, hsl(0deg, 0%, 10%));
    --text-color: var(--color-light, hsl(0deg, 0%, 100%));
    --highlight-color: var(--color-primary, hsl(200deg, 60%, 50%));
    --padding: var(--padding-size-base, 30px);
    --margin: var(--margin-size-base, 30px);
    --title-font-size: var(--h1-font-size, 4rem);
    --title-font-weight: var(--font-weight-bold, 700);
    --sub-title-font-size: var(--h4-font-size, 2rem);
    --content-font-size: var(--font-size-base, 1.25rem);
    --color-meta: var(--color-grey-300, hsl(0deg, 0%, 70%));
    --border: var(--border-light, 1px solid var(--color));

    /*
    * Colors
    */
    --color-white: #fff;
    --color-grey-100: #f5f5f5;
    --color-grey-300: #c8c8c8;
    --color-grey-500: #909090;
    --color-grey-700: #5f5f5f;
    --color-grey-900: #2e2e2e;
    --color-black: #000;
    --color-blue: blue;
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
    --color-light: var(--color-grey-100);
    --color-dark: var(--color-grey-900);
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
    --spacer: 1rem;
    --margin-size-base: var(--spacer);
    --padding-size-base: var(--spacer);
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
    --border-color: var(--color-light);
    --border-light: var(--border-size) var(--border-style) var(--border-color);
  }

`;
export default GlobalStyles;