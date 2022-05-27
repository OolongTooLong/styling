# Styling 2022
#### This Repository is being used to develop base styling for general use.
* The project uses [SCSS](https://sass-lang.com/) and [Gulp](https://gulpjs.com/) as a preprocessor.
* Overall layout is achieved using [CSS Grid Layout Module](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout).
* Establishes [scales](https://cloudfour.com/thinks/responsive-guide-to-type-sizing/) for use in spacing, fonts, breakpoints and colours and utility classes.
* Uses SCSS [logic](https://sass-lang.com/documentation/at-rules/control/if) to generate CSS variable dependant utility class, such as background colour or padding classes `pad-200` or `bg-primary` etc.
* Leverages a common HTML pattern to reliably achieve a range of design requirements.

Creating a local version?
* Install `NODE` & `Gulp` with HomeBrew, then use `npm install` in project directory to install from `package.json`

On mac silicon?
* Duplicate terminal app, rename and set to run with rosetta. [Guide](https://hackernoon.com/apple-m1-chip-how-to-install-homebrew-using-rosetta-su12331b)

## HTML Structure
I've leveraged some layouts from [**every layout**](https://every-layout.dev/) & combined with my own grid based styling. The idea is to create powerful CSS that is scalable and fast to write.
A interesting part of this project is SCSS logic like `@each`, `@for`, `@if`, which is used to rapidly create utility classes based on CSS variables.

**Pages are built upon the idea of grid rows, with the structure shown below.** The styling is based on a 14 column grid, row can be placed anywhere on the grid, the 12 inner columns have a fixed width, the two gutter columns on the edges of the page spread as far as needed.
````html
<article class="grid-row">
    <section class="grid"><!-- automatic column number -->
        <div><!-- --></div>
        <div><!-- --></div>
        <div><!-- --></div>
    </section>
</article>
````
Any HTML elements can be used with the same class set up
````html
<header class="grid-row">
    <nav class="grid">
        <address><!-- --></address>
        <video><!-- --></video>
        <div><!-- --></div>
    </nav>
</header>
````
Successive rows can be used to create whole pages
```html
<article class="grid-row">
    <section id="title" class="grid"> <!-- One Column -->
        <div><!-- --></div>
    </section>
    <section id="text" class="grid"> <!-- Two Columns -->
        <figure><!-- --></figure>
        <div><!-- --></div>
    </section>
    <section id="gallery" class="grid"> <!-- Four Columns -->
        <figure><!-- --></figure>
        <figure><!-- --></figure>
        <figure><!-- --></figure>
        <figure><!-- --></figure>
    </section>
</article>
```
`.grid-row` is a wrapper for as many `.grid` elements as you want. Each `.grid` element can be set to a different widths: `standard`, `alignwide`, `alignfull` , `narrow` & `narrowest`.

In this image you can see the different widths: the top row is `.align-full`, the second row is `.align-wide` and the bottom row is aligned to the `.standard` width

![image of grid colmns](img/twelve-column.png "shows the three ")

This approach allows flexibility when building up pages with combinations of coloured backgrounds and different margins.
```scss
  .grid-row {
    align-items: stretch;
    display: grid;
    grid-auto-flow: dense;
    grid-auto-rows: minmax(min-content, max-content);
    grid-template-columns: [full-start] minmax(calc(calc(100% - 1500px) / 2), 1fr) [main-start] repeat(12, [col-start] 1fr) [main-end] minmax(calc(calc(100% - 1500px) / 2), 1fr) [full-end];
    grid-template-rows: auto;
    margin: 0 auto var(--gridsize) auto;
    max-width: calc(var(--measure) * 5);
    position: relative;
  }
```
This CSS grid applied to `.grid-row` is a 14 column grid, 12 have a fixed width, and the two outermost spread to as large a possible. This is used control the `.grid` width options:
```scss
.narrowest {
  grid-column-start: 5;
  grid-column-end: 11;
}
.narrow {
  grid-column-start: 4;
  grid-column-end: 12;
}
.standard { // Declared as the default, no need to declare the class
  grid-column-start: 3;
  grid-column-end: 13;
}
.align-wide {
  grid-column-start: 2;
  grid-column-end: 14;
}
.align-full {
  grid-column-start: 1;
  grid-column-end: 15;
}
```
By default, they are set to the `standard` width, which doesn't need to be declared
```html
<article class="grid-row">
    <section class="grid">
        <div><!-- --></div>
        <div><!-- --></div>
        <div><!-- --></div>
    </section>
    <section class="grid align-wide">
        <div><!-- --></div>
        <div><!-- --></div>
        <div><!-- --></div>
    </section>
    <section class="grid align-full">
        <div><!-- --></div>
        <div><!-- --></div>
        <div><!-- --></div>
    </section>
</article>
```
`.grid-row`'s can be separated out to allow for further separation when wanting to apply different background colours or images that should span full width
```html
<article>
    <section class="grid-row bg-primary-main">
        <div class="grid align-wide">
            <div><!-- --></div>
            <div><!-- --></div>
        </div>
    </section>
    <section class="grid-row">
        <div class="grid">
            <div><!-- --></div>
            <div><!-- --></div>
        </div>
    </section>
    <section class="grid-row bg-primary-main">
        <div class="grid align-wide">
            <div><!-- --></div>
            <div><!-- --></div>
        </div>
    </section>
</article>
```
---
### ``grid``
The `.grid` inside of the `.grid-row` automatically sets the column number to match the number of child elements with a minimum width of 250px
````scss
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
````
```html
<article class="grid-row">
    <section class="grid">
        <div><!-- --></div>
        <div><!-- --></div>
    </section>
</article>
```
These classes can be used to alter the minimum block width like below, the default is ``250px``
```scss
.tiny-blocks / 10px;
.small-blocks / 200px;
.default-blocks / 250px; // the default, no need to declare
.medium-blocks / 350px;
.large-blocks / 450px;
```

These classes can be used to enforce column structures like below
```scss
.has-one-column
.has-two-columns
.has-three-columns
.has-four-columns
.has-five-columns
.has-six-columns
```
```html
<article class="grid-row">
    <section class="grid has-two-columns">
        <div><!-- --></div>
        <div><!-- --></div>
    </section>
</article>
```
Some of these layouts have modifier classes to adjust the ratios of the column structure
```html
<article class="grid-row">
    <section class="grid has-two-columns">
        <div><!-- --></div>
        <div><!-- --></div>
    </section>
    <section class="grid has-two-columns left-wide">
        <div><!-- --></div>
        <div><!-- --></div>
    </section>
    <section class="grid has-two-columns right-wide">
        <div><!-- --></div>
        <div><!-- --></div>
    </section>
</article>
```
It will enforce the column layout regardless of the number of child elements.
```html
<article class="grid-row">
    <section class="grid has-three-columns">  <!-- Still three columns -->
        <div><!-- --></div>
        <div><!-- --></div>
        <div><!-- --></div>
        <div><!-- --></div>
        <div><!-- --></div>
        <div><!-- --></div>
    </section>
</article>
```

### SCSS Folder Structure
* The structure utilises @use & @forward to organise the styles before compiling with Gulp
```text
/SCSS
  /_abstracts || Define base values used in the rest of the stylesheet
    _breakpoints.scss || Set breakpoints as SCSS variables
    _colours.scss || Set colours as SCSS variables to programmatically generate CSS variables
    _font-scale.scss || Sets up scaled size range in CSS variables for font sizes
    _space-scale.scss || Sets up scaled size range in CSS variables for spacing

  /_base || Define base styles used in the rest of the projects
    _buttons.scss || base button styles
    _every-layout.scss || collection of useful styles for common layouts
    _grid.scss || Define base grid styles for page layouts
    _reset.scss || reset
    _typography.scss || Set typography styles from font scale
    index.scss || @forwards files from this directory for use in main stylesheet

  /_components
    /_every-layout
    index.scss || @forwards files from this directory for use in main stylesheet

  /_utilities
    /_generator
      _colour-utility.scss
      _space-utility.scss
      index.scss || @forwards files from this directory for use in main stylesheet
    /_low-specificity
      _low-specificity.scss
      _utility-addons.scss
      index.scss || @forwards files from this directory for use in main stylesheet
    /_mixins
      _aspect.scss
      _colour.scss
      _crux.scss
      _family-mixin.scss
      _keyframes.scss
      _media-query.scss || Generates a min and a max variation of media queries from _abstract/_breakpoints.scss
      _vendor-prefixes.scss
      index.scss || @forwards files from this directory for use in main stylesheet
    index.scss || @forwards files from this directory for use in main stylesheet
    _accessibility.scss
  global.scss || Top Level file to be targeted by Gulp
gulp-file.js || Processes all styles by targeting global.scss
```


### SCSS , CSS Variables
Using SCCS logic we can create base values to build the rest of our styling from. these base values are set out in `abstracts`
SCSS variables are used for media queries as CSS varible cannot be used in a media query and they don't need to be changed often
```scss
$large: 1300px;
$medium-large: 1100px;
$medium: 1000px;
$largeTablet: 920px;
$tablet: 767px;
$phablet: 575px;
$mobile: 480px;
$smallmobile: 375px;
```
Global CSS variables are used to set/store all the values for `margins`, `max-width`,`grid-gap` & `padding` etc....

These values can be set globally & adjusted for local elements.
### Colours /_abstracts/_colours.scss
Colours set in SCSS Variables and produce CSS variables

[HSL](HSL colours (Hue Saturation Lightness) are easy to tweak)

One of the biggest advantages of using HSL is its readability. You don’t have to spend many hours to learn how to read HEX code. Also, it’s much easier than imagining RGB.)
```scss
/*----------------------------------------
    # Theme Colours
----------------------------------------*/
$colors: (
        primary:(
                "main": hsl(190, 72%, 66%),
                "highlight": hsl(190, 60%, 40%),
                "invert": hsl(190, 100%, 100%),
        ),
        secondary:(
                "main": hsl(177, 42%, 76%),
                "highlight": hsl(177, 55%, 30%),
                "invert": hsl(177, 42%, 100%),
        ),
        tertiary:(
                "main":hsl(26, 89%, 57%),
                "highlight": hsl(26, 80%, 30%),
                "invert": hsl(26, 89%, 100%),
        ),
        quaternary:(
                "main": hsl(70, 31%, 85%),
                "highlight": hsl(70, 20%, 60%),
                "invert": hsl(70, 31%, 10%),
        ),
        light:(
                "main": hsl(5, 2%, 100%),
                "highlight": hsl(5, 2%, 50%),
                "invert": hsl(5, 2%, 0%),
        ),
        dark:(
                "main": hsl(5, 2%, 0%),
                "highlight": hsl(5, 2%, 50%),
                "invert": hsl(5, 2%, 100%),
        ),
);
:root{
      @each $color, $shades in $colors{
            @each $shade, $value in $shades{
                --#{$color}-#{$shade}: #{$value}
            }
      }
}
````
Above complies to below:
````css
:root {
  --primary-main: hsl(190deg, 72%, 66%) ;
  --primary-highlight: hsl(190deg, 60%, 40%) ;
  --primary-invert: hsl(190deg, 100%, 100%) ;
  --secondary-main: hsl(177deg, 42%, 76%) ;
  --secondary-highlight: hsl(177deg, 55%, 30%) ;
  --secondary-invert: hsl(177deg, 42%, 100%) ;
  --tertiary-main: hsl(26deg, 89%, 57%) ;
  --tertiary-highlight: hsl(26deg, 80%, 30%) ;
  --tertiary-invert: hsl(26deg, 89%, 100%) ;
  --quaternary-main: hsl(70deg, 31%, 85%) ;
  --quaternary-highlight: hsl(70deg, 20%, 60%) ;
  --quaternary-invert: hsl(70deg, 31%, 10%) ;
  --light-main: hsl(5deg, 2%, 100%) ;
  --light-highlight: hsl(5deg, 2%, 50%) ;
  --light-invert: hsl(5deg, 2%, 0%) ;
  --dark-main: hsl(5deg, 2%, 0%) ;
  --dark-highlight: hsl(5deg, 2%, 50%) ;
  --dark-invert: hsl(5deg, 2%, 100%) ;
}
````

````scss
/*----------------------------------------
    # Base Colours
----------------------------------------*/
$baseColors: (
        base:(
                "green": #30b130,
                "orange": #f3af3a,
                "red": #de2e2e,
                "white": #ffffff,
                "grey": #b0b0b0,
                "black": #000000,
                "purple": #3B3646,

                // fonts Default Colour
                "body": #2b2b2b,
                "heading": #2b2b2b,
                "background": #f3f3f3,

                // Button Default Colour
                "button-background": #223c6d,
                "button-hover": #2e5ab0,
                "button-text": #ffffff,
                "button-hover-text": #a0bde0,
                "button-border-color": #1a1a1a,
                "button-hover-border-color": #1a1a1a,

                "link-colour": #1a1a1a,
        ),
);

:root{
      @each $bColor, $bShades in $baseColors{
            @each $shade, $value in $bShades{
                --#{$bColor}-#{$shade}: #{$value}
            }
      }
}
````
Above complies to below:
````css
:root {
      --base-green: #30b130 ;
      --base-orange: #f3af3a ;
      --base-red: #de2e2e ;
      --base-white: #ffffff ;
      --base-grey: #b0b0b0 ;
      --base-black: #000000 ;
      --base-purple: #3B3646 ;
      --base-body: #2b2b2b ;
      --base-heading: #2b2b2b ;
      --base-background: #f3f3f3 ;
      --base-button-background: #223c6d ;
      --base-button-hover: #2e5ab0 ;
      --base-button-text: #ffffff ;
      --base-button-hover-text: #a0bde0 ;
      --base-button-border-color: #1a1a1a ;
      --base-button-hover-border-color: #1a1a1a ;
      --base-link-colour: #1a1a1a ;
}
````

### Space Scale
Sizes set in CSS Variables
This is a Major Third scale that powers all the utilities that it is relevant for (margin, padding). All items are calculated off the base size, so change that and cascade across your whole project.
```css
:root{
      --spacing-ratio: 1.3; // Adjust all other values

      --s-5: calc(var(--s-4) / var(--spacing-ratio)); //Smallest Value
      --s-4: calc(var(--s-3) / var(--spacing-ratio));
      --s-3: calc(var(--s-2) / var(--spacing-ratio));
      --s-2: calc(var(--s-1) / var(--spacing-ratio));
      --s-1: calc(var(--s1) / var(--spacing-ratio));
      --s0:0;
      --s1: 1rem;
      --s2: calc(var(--s1) * var(--spacing-ratio));
      --s3: calc(var(--s2) * var(--spacing-ratio));
      --s4: calc(var(--s3) * var(--spacing-ratio));
      --s5: calc(var(--s4) * var(--spacing-ratio));
      --s6: calc(var(--s5) * var(--spacing-ratio));
      --s7: calc(var(--s6) * var(--spacing-ratio)); // Largest Value

      --s-neg5: calc(-1 * var(--s5)); // Negative values
      --s-neg4: calc(-1 * var(--s4));
      --s-neg3: calc(-1 * var(--s3));
      --s-neg2: calc(-1 * var(--s2));
      --s-neg1: calc(-1 * var(--s1));

      --measure: 90ch;
      --grid-gap: var(--s2);
      --base-button-border-weight:2px;
}
````
### Font Scale
This is a Major Third scale that powers all the utilities that it is relevant for FONT SIZES All items are calculated off the base size, so change that and cascade across your whole project.
```css
:root{
      --font-ratio: 1.2; // Adjust all other values
      --f0: 1rem;
      --f1: calc(var(--f0) * var(--font-ratio));
      --f2: calc(var(--f1) * var(--font-ratio));
      --f3: calc(var(--f2) * var(--font-ratio));
      --f4: calc(var(--f3) * var(--font-ratio));
      --f5: calc(var(--f4) * var(--font-ratio));
      --f6: calc(var(--f5) * var(--font-ratio));
      --f7: calc(var(--f6) * var(--font-ratio));
      --f8: calc(var(--f7) * var(--font-ratio)); // Largest Value

      --heading-font: 'Lato', sans-serif;
      --body-font: 'Lato', sans-serif;
      --heading-weight: 700;
      --body-weight: 300;
      --body-line-height: 2;
      --heading-line-height: 1;
      --max-character-length: 15ch;
}

````
### SCSS LOGIC
CSS variables are used to create utility classes, this allows the values to be updated easily without re-compiling.
Utility classes dynamically generated using [logic](https://sass-lang.com/documentation/at-rules/control/if)

#### Space Scales
```scss
// Tie SCSS variables to CSS variable in order to apply logic
@use "../../_abstracts/space-scale";
$size-scale: (
        '000': var(--s0),
        '100': var(--s1),
        '200': var(--s2),
        '300': var(--s3),
        '400': var(--s4),
        '500': var(--s5),
        '600': var(--s6),
        '700': var(--s7),
);
// Iterate over values to creat classes
@each $size, $value in $size-scale {
      .grid-gap-#{$size} {
          grid-gap: $value;
      }
}
````
````css
.grid-gap-000 {
  grid-gap: var(--s0);
}
.grid-gap-100 {
  grid-gap: var(--s1);
}
.grid-gap-200 {
  grid-gap: var(--s2);
}
.grid-gap-300 {
  grid-gap: var(--s3);
}
.grid-gap-400 {
  grid-gap: var(--s4);
}
.grid-gap-500 {
  grid-gap: var(--s5);
}
.grid-gap-500 {
  grid-gap: var(--s5);
}
.grid-gap-600 {
  grid-gap: var(--s6);
}
.grid-gap-700 {
  grid-gap: var(--s7);
}
````
##### Colour scale
```scss
@use "../../_abstracts/colours";
@each $color, $shades in colours.$colors {
      @each $shade, $value in $shades {
            @if $shade == main {
                  .bg-#{$color}-#{$shade} {
                    background-color: var(--#{$color}-#{$shade});
                    color: var(--#{$color}-invert);
                  }
            }
      }
}
```
```css
.bg-primary-main {
  background-color: var(--primary-main);
  color: var(--primary-invert);
}
.bg-secondary-main {
  background-color: var(--secondary-main);
  color: var(--secondary-invert);
}
.bg-tertiary-main {
  background-color: var(--tertiary-main);
  color: var(--tertiary-invert);
}
.bg-quaternary-main {
  background-color: var(--quaternary-main);
  color: var(--quaternary-invert);
}
.bg-light-main {
  background-color: var(--light-main);
  color: var(--light-invert);
}
.bg-dark-main {
  background-color: var(--dark-main);
  color: var(--dark-invert);
}
```
#### FONTS
```scss
body {
  font-family: var(--body-font);
  font-weight: var(--body-weight);
  font-size: var(--f0);
  line-height: var(--body-line-height);
}
h1, h2, h3, h4, h5, h6 {
  min-height: 0.000001vw;
  color: var(--base-heading);
  margin-bottom: var(--f2);
  font-family: var(--heading-font);
  line-height: var(--heading-line-height);
}
h1, .h1 {
  font-size: clamp(var(--f4), 5vw, var(--f7));
}

h2, .h2 {
  font-size: clamp(var(--f2), 5vw, var(--f4));
}

h3, .h3 {
  font-size: clamp(var(--f1), 5vw, var(--f3));
}

h4, .h4 {
  font-size: clamp(var(--f0), 3vw, var(--f2))
}

h5, .h5 {
  font-size: clamp(var(--f0), 2vw, var(--f1));
}

h6, .h6 {
  font-size: clamp(var(--f0), 1vw, var(--f0));
  font-weight: 100;
}
a {
  color: var(--base-link-colour);
}

p {
  font-size: clamp(var(--f0), 2vw, var(--f0));
  margin-bottom: var(--f1);
  color: var(--base-body);

  &.intro {
    font-weight: 400;
    @include mq-min(medium) {
      font-size: clamp(var(--f1), 2vw, var(--f1));
      line-height: 1.4;
    }
  }
  &.sub-text {
    letter-spacing: 3px;
    font-size: 0.6rem;
  }
}

p[style*="text-align: center"] {
  max-width: unset;
}

ol, ul {
  color: var(--base-body);
  padding-left: 13px;

  li {
    color: var(--base-body);
  }
}
blockquote {
  font-size: clamp(var(--f2), 5vw, var(--f3));
  color: var(--base-heading);
  font-family: var(--heading-font);
  font-weight: 900;
  line-height: var(--heading-line-height);
  font-style: italic;
  text-align: left;
  padding: var(--s3) var(--s-1);
}
```
#### MEDIA QUERIES
```scss
@use "../../_abstracts/breakpoints" as *;

@mixin mq($key) {
  $size: map-get($breakpoints, $key);
  @media only screen and (max-width: $size) {
    @content;
  }
}
@mixin mq-min($key) {
  $size: map-get($breakpoints, $key);
  @media only screen and (min-width: $size) {
    @content;
  }
}
```
```scss
// Usage
@include mq-min(medium) {
  //...
}
@include mq(mobile) {
  //...
}
````
```scss
// Advanced
@each $size, $value in $size-scale {
    .pad-#{$size} {
            padding-top: $value;
            padding-bottom: $value;
            padding-left: $value;
            padding-right: $value;
            @each $breakpointName, $breakpointValue in $breakpoints {
                  @include mq-min($breakpointName) {
                        &-#{$breakpointName} {
                              padding-top: $value;
                              padding-bottom: $value;
                              padding-left: $value;
                              padding-right: $value;
                        }
                  }
            }
    }
}
```
```css
.pad-100 {
  padding-top: var(--s1);
  padding-bottom: var(--s1);
  padding-left: var(--s1);
  padding-right: var(--s1);
}
@media only screen and (min-width: 1500px) {
  .pad-100-extra-large {
    padding-top: var(--s1);
    padding-bottom: var(--s1);
    padding-left: var(--s1);
    padding-right: var(--s1);
  }
}
@media only screen and (min-width: 1300px) {
  .pad-100-large {
    padding-top: var(--s1);
    padding-bottom: var(--s1);
    padding-left: var(--s1);
    padding-right: var(--s1);
  }
}
@media only screen and (min-width: 1100px) {
  .pad-100-medium-large {
    padding-top: var(--s1);
    padding-bottom: var(--s1);
    padding-left: var(--s1);
    padding-right: var(--s1);
  }
}
@media only screen and (min-width: 1000px) {
  .pad-100-medium {
    padding-top: var(--s1);
    padding-bottom: var(--s1);
    padding-left: var(--s1);
    padding-right: var(--s1);
  }
}
@media only screen and (min-width: 920px) {
  .pad-100-large-tablet {
    padding-top: var(--s1);
    padding-bottom: var(--s1);
    padding-left: var(--s1);
    padding-right: var(--s1);
  }
}
@media only screen and (min-width: 767px) {
  .pad-100-tablet {
    padding-top: var(--s1);
    padding-bottom: var(--s1);
    padding-left: var(--s1);
    padding-right: var(--s1);
  }
}
@media only screen and (min-width: 575px) {
  .pad-100-phablet {
    padding-top: var(--s1);
    padding-bottom: var(--s1);
    padding-left: var(--s1);
    padding-right: var(--s1);
  }
}
@media only screen and (min-width: 480px) {
  .pad-100-mobile {
    padding-top: var(--s1);
    padding-bottom: var(--s1);
    padding-left: var(--s1);
    padding-right: var(--s1);
  }
}
@media only screen and (min-width: 375px) {
  .pad-100-small-mobile {
    padding-top: var(--s1);
    padding-bottom: var(--s1);
    padding-left: var(--s1);
    padding-right: var(--s1);
  }
}
```
---
### Example
This set up below makes a full width row with three columns & no gap between the elements
```html
<article class="grid-row">
    <section class="grid align-full grid-gap-000">
        <figure><!-- --></figure>
        <figure><!-- --></figure>
        <figure><!-- --></figure>
    </section>
</article>
```
A wide row with padding all around
```html
<article class="grid-row">
    <section class="grid align-wide pad-500">
        <div><!-- --></div>
    </section>
</article>
```

## Scripts
Scripts a processed by gulp to pull in dependencies before compiling implementation code.
Gulp processes files in an intentional order, dependencies from node-modules or from _vendor folder, and config files from _components are processed into temporary files before concatenation
#### Gulp Tasks
The default ``gulp``  task is all you should need to use ins development, but ``scssProd`` should be used for production assets. Commands should be run in the root of the project. These tasks are also hooked up to NPM, using ``npm run`` instead of ``gulp``.

- ``gulp`` - Runs ``js``/``scss`` & watches for changes
- ``gulp js`` -  Bundles vendor & custom scripts
- ``gulp scss`` - Process styles with auto-prefixer & sourcemaps
- ``gulp scssProd`` - Minify styles
- ``gulp watchStyles`` - Watch the styles for changes
- ``gulp watchScripts`` - Watch the scripts for changes
- ``gulp dumpDatabase`` - Pulls a copy of the database

Some IDE's support UI's for these kinda of tasks, usually accessed by right clicking the ``gulpfile.js`` or ``package.json``
## Basic Script Pattern
````js
let templateApp=(()=>{
    let init=()=>{
        $(document).ready(function() {
           yourName();
        });
        document.fonts.ready.then(function () {
            yourSecondName();
        });
    },
    yourName=()=>{
      // LOGIC
    },
    yourSecondName=()=>{
      // LOGIC
    },
    ;
    init();
    return {};
})();
````
## Notes on local dev environment (non-essential)
### Development Environment
I'm currently set up a nice local environment which requires minimal configuration for hosting local sites. I'm using [Laravel](https://laravel.com/) & [Valet](https://laravel.com/docs/8.x/valet).

> Valet is a Laravel development environment for Mac minimalists. No Vagrant, no /etc/hosts file. You can even share your sites publicly using local tunnels. Yeah, we like it too.

> Laravel Valet configures your Mac to always run Nginx in the background when your machine starts. Then, using DnsMasq, Valet proxies all requests on the *.test domain to point to sites installed on your local machine.

> Rather than running a virtual machine Ã  la Docker, Valet runs Nginx in the background and uses your local PHP and MySQL. This keeps your development environment very lean, only using about 7MB of RAM.

> Out of the box, Valet support includes, but is not limited to:
> - [Laravel](https://laravel.com)
> - [Lumen](https://lumen.laravel.com)
> - [Symfony](https://symfony.com)
> - [Zend](https://framework.zend.com)
> - [CakePHP 3](https://cakephp.org)
> - [WordPress](https://wordpress.org)
> - [Bedrock](https://roots.io/bedrock/)
> - [Craft](https://craftcms.com)
> - [Statamic](https://statamic.com)
> - [Jigsaw](http://jigsaw.tighten.co)
> - Static HTML

I found several useful guides online: [here](https://dev.to/pixleight/local-craft-cms-development-with-laravel-valet-27f8), [here](https://medium.com/@jalendport/running-craft-cms-3-on-laravel-valet-6df61e5193fd) & [here](https://bymayo.co.uk/writing/installing-laravel-valet-for-craft-cms)

Once it's all set up next time I need to create a craft theme all I have to do is:
````bash
# Move to your parked projects directory
cd ~/Sites

# Create folder

# Create a new database
mysql -u root -e "CREATE DATABASE new_db_name"


````
``new-site-name`` will automatically be served at ``http://<new-site-name>.test``

Or if preferred, you can install ``phpmyadmin`` and mange the database using the GUI, [here's](https://thepoweruser.wordpress.com/2018/11/22/how-to-set-up-and-use-phpmyadmin-with-laravel-valet/) a guide

Valet will automatically start its daemon each time your machine boots. There is no need to run ``valet start`` or ``valet install`` ever again once the initial Valet installation is complete.
