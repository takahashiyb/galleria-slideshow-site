# Frontend Mentor - Galleria slideshow site solution

This is a solution to the [Galleria slideshow site challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/galleria-slideshow-site-tEA4pwsa6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Navigate the slideshow and view each painting in a lightbox

### Links

- Solution URL: [Github Repository](https://github.com/takahashiyb/galleria-slideshow-site)
- Live Site URL: [Live site](https://takahashiyb.github.io/galleria-slideshow-site/#/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- SASS - CSS Preprocessor
- Vue - Javascript Framework
- Vue-router - Vue's routing library
- Pinia - Vue state manager
- Typescript - statically-typed superset of JavaScript

### What I learned

The layout of the home page was difficult to implement when it did not click to me right away until I decided to use column count instead of using flex-boxes to make the thumbnails/cards flow in columns.

This was my first time routing with parameters in Vue, so it took me a while to understand the nuances like how its single page application means that the page does not really reload the components since it isn't actually reloading the page, only its components. So, I had to add a watch() Vue built-in function to check whether the params of the path have changed to update whatever needs to be displayed.

It was also my first time dabbling the setInterval and setTimeout in depth. I learned how to add and clear them as to not overlap between multiples.

### Continued development

I think what I want to do in the future, knowing what I know now is that, if 2 components share the same data and functions, and that neither are used in other parts of the site, it might be better to just keep these components as one.

## Author

- Frontend Mentor - [@takahashiyb](https://www.frontendmentor.io/profile/takahashiyb)

## Acknowledgments

-vick bake from Frontend Mentor - [@vickbk](https://www.frontendmentor.io/profile/vickbk) - for teaching me new standards, including using min-height or min-width set at 100% and using sr-only span tags for accessibility.
