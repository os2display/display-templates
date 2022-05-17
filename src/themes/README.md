# Theme development

For the styles to have effect you will need to append `#SLIDE_ID` to all styling.

`#SLIDE_ID` will be replaced with an actual id on the client to isolate the styling on the current slide.

## Examples

An example file can be found in this directory.

Below is a example of variables on the slide container.

```css

#SLIDE_ID {
  /* Default variables */
  --bg-light: #f6f6f6;
  --text-dark: #333333;
  --color-primary: #3761d9;
  --color-secondary: #ef0043;
  --font-family-base: Arial, "sans-serif";
  /* Darkmode overrides */
  --bg-dark: #333333;
  --text-light: #ffffff;
}

```

Below is a example of simple background color on the whole slide using the template Text and Image.

```css

#SLIDE_ID .template-text-image {
  background-color: hsl(240, 100, 99);
}

```

Below is a example of setting a color on `H1` elements.

```css

#SLIDE_ID h1 {
  color: hsl(240, 3, 7);
}

```

