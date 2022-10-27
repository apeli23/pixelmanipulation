import { useRef, useEffect } from 'react';
import Head from 'next/head';


export default function Home() {
  const canvasRef = useRef(undefined);
  const orgRef = useRef(undefined);
  const grayRef = useRef(undefined);
  const invRef = useRef(undefined);

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

  const original = () => {
    grayRef.current.checked = false;
    invRef.current.checked = false;
    console.log(image)
    context.drawImage(image, 0, 0);
  };

  const invert = () => {
    orgRef.current.checked = false;
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

  const grayscale = () => {
    orgRef.current.checked = false;
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


  return (
    <div className="h-screen overflow-hidden">
      <Head>
        <title>JS-Pixel Manipulation</title>
        <meta name="description" content="created by brian apeli" />
        <link rel="icon" href="/image/logo.png" />
      </Head>

      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="https://flowbite.com/" className="flex items-center">
            <img src="image/logo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Javascript Pixel Manipulation</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="https://www.apeli.tech/" >
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-200 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Blog
                    </span>
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='max-w-md mx-auto pt-8 pb-12 rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input id="vue-checkbox-list" type="checkbox" value="" onClick={original} ref={orgRef} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor="vue-checkbox-list" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300" >Original</label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input id="react-checkbox-list" type="checkbox" value="" ref={grayRef} onClick={grayscale} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor="react-checkbox-list" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Gray Scale</label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input id="angular-checkbox-list" type="checkbox" value="" ref={invRef} onClick={invert} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor="angular-checkbox-list" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Inverted</label>
            </div>
          </li>
          {/* <li className="w-full dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input id="laravel-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor="laravel-checkbox-list" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Serpia</label>
            </div>
          </li> */}
        </ul>
        <div className="md:flex " >
          <canvas className="h-100 w-full md:h-full md:w-100 py-12 rounded" ref={canvasRef} />
        </div>
      </div>
    </div>
  )
}
