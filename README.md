# JAVASCRIPT PIXEL MANIPULATION

## Introduction

A pixel refers to the basic unit of programmable color on a computer display or in a computer image. To manipulate it, you can erase, create, copy, and move pixels on a screen to show something different than it was originally was. This article explores the manipulation of image pixels through HTML canvas using javascript code.

## Prerequisites

To explore the article you will need to have basic knowledge in javascript and reactjs.

## Create a new Nextjs Project

Use `npx create-next-app <projectname>` to create a new Next js project.
First, we need to install [tailwind](https://tailwindcss.com/) which will make it quicker to write and maintain our application's code.
For a faster integration process, you can use the following [link](https://tailwindcss.com/docs/guides/nextjs) to get the direct instructions for integration. Let us briefly show the integration process.

Install `tailwindcss` and its peer dependencies via npm, and then run the init command to generate both `tailwind.config.js` and `postcss.config.js.`

```
"terminal"

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add the paths to all of your template files in your tailwind.config.js file.

```
"terminal"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

Add the `@tailwind directives` for each of Tailwind’s layers to your `./styles/globals.css` file

```
"terminal"

@tailwind base;
@tailwind components;
@tailwind utilities;
```

And that's it!. Tailwind has been intergrated. We can now go ahead and start using it for our DOM elements.

Our UI will have one picture with 3-pixel check boxes; `original`, `grayscale` and `inverted`. A user can select any of the check boxes to change the image's pixel. Eventually, our UI will look as follows:

![complete UI](https://res.cloudinary.com/dlt0f5pvq/image/upload/v1666869001/Screenshot_2022-10-27_at_14.08.42_ftpefs.png 'complete UI')

To begin We will place a canvas on the page to contain an image loaded from the `useEffect` hook whenever the page is rendered. We use `useRef` hook to reference the DOM elements.

Paste the following code inside the return statement:
At this point, you are probably experiencing errors of undefined properties. Do not worry. We will create them as we move on.

Include the following imports in the `pages/index.js` directory

```
"pages/index.js"

import { useRef, useEffect } from 'react';
import Head from 'next/head';
```
The above code simply imports our state hooks. The `useRef` will be used to Reference individual DOM elements while the `useEffect` hook will perform actions specified to it after the page is rendered.

Inside the home component, paste the codes below:

```
"pages/index.js"

  const canvasRef = useRef(undefined);
  const orgRef = useRef(undefined);
  const grayRef = useRef(undefined);
  const invRef = useRef(undefined);
```
We will use the above codes to reference our canvas element, original checkbox option, grayscale option and invert checkbox option respectively.

Below the codes declared above, paste the following:

```
"pages/index.js"

let image, canvas, context;
  useEffect(() => {
    image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = 'image/sample.png';

    canvas = canvasRef.current;
    canvas.width = 1400;
    canvas.height = 1400;
    console.log(canvas.width)
    console.log(canvas)
    context = canvas.getContext("2d");

    image.onload = () => {
      context.drawImage(image, 0, 0);
    };
  }, []);
```

Above, we declare three variables; a canvas, a context, and image variable.
Inside a  `useEffect` hook, we create a new image element and assign the image variable. When a project involves sharing resources from one domain its another, it's important to set the cross-origin attribute. Basically, it handles the CORS request to allow safe resource sharing. By setting it to `anonymous` we create a CORS request which will be sent without passing the credential information.
We then set the image source file from the `public/image` directory.
Next, we reference the canvas object in the DOM element and set its width and height properties. We command the app to draw the image inside the canvas context upon loading of the page.

Let us now create the images to perform the pixel manipulation commands.

## Inverted

Use the following command to achieve an inverted pixel look

```
"pages/index.js"

  const invert = () => {
    orgRef.current.checked= false;
    grayRef.current.checked = false;
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]; // red
      data[i + 1] = 255 - data[i + 1]; // green
      data[i + 2] = 255 - data[i + 2]; // blue
    }
    context.putImageData(imageData, 0, 0);
  };
```

The code above will first uncheck any other checkboxes if they are checked. It then draws the image from the use Effect hook in the canvas context and calculates how to create a pixel look by manipulating the canvas image data's red, green and blue pixels and final replaces the original /placed image with the new look.

![inverted](https://res.cloudinary.com/dlt0f5pvq/image/upload/v1666871367/Screenshot_2022-10-27_at_14.48.37_jor19q.png 'inverted')

Using the above dynamics, we go ahead and create the grayscale view

## Gray Scale

```
  const grayscale = () => {
    orgRef.current.checked= false;
    invRef.current.checked = false;

    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    context.putImageData(imageData, 0, 0);
  };

```
![complete UI]( https://res.cloudinary.com/dlt0f5pvq/image/upload/v1666871367/Screenshot_2022-10-27_at_14.48.47_ohmycx.png 'complete UI')

### Original.

As for the original version. We will simply draw the original image to the canvas context as sone in the `useEffect` hook.

```
"pages/index.js"

  const original = () => {
    grayRef.current.checked = false;
    invRef.current.checked = false;
    console.log(image)
    context.drawImage(image, 0, 0);
  };

```

That will be it! You have successfully create a demonstration of pixel manipulation using javascript and Nextjs library. Feel free to checkout this blog anytime for reference.

You can also check other software developement blogs on this [site](https://www.apeli.tech/posts).

Happy coding!