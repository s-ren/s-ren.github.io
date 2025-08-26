import Color from "./color/Color";
/**
 * Browser context detection
 *
 * @returns Is a browser context
 */
export declare const checkIsBrowser: () => boolean;
/**
 * Worker in Browser context detection
 *
 * @returns Is a worker browser context
 */
export declare const checkIsWorker: () => boolean;
/**
 * Node.js context detection
 *
 * @returns Is Node.js context
 */
export declare const checkIsNode: () => boolean;
/**
 * Sort colors and generate standard list of colors.
 *
 * @param _colors List of colors
 * @param _pixels Count of pixels in the image
 * @param _hueDistance Maximal HUE distance between pixel before pixel merging
 * @param _saturationDistance Maximal saturation distance between pixel before pixel merging
 * @param _lightnessDistance Maximal lightness distance between pixel before pixel merging
 * @returns Sorted colors list
 */
export declare const sortFinalColors: (_colors: Color[], _pixels: number, _hueDistance: number, _saturationDistance: number, _lightnessDistance: number) => import("./types/Color").FinalColor[];
/**
 * Extract ImageData from image.
 * Reduce image to a pixel count.
 * Browser only
 *
 * @param _image HTML image element or Image Bitmap
 * @param _pixels Count of maximum pixels accepted for the calculation
 * @returns Data of the reduced image
 */
export declare const extractImageData: (_image: HTMLImageElement | ImageBitmap, _pixels: number) => ImageData;
