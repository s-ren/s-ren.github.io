import { FinalColor } from "./types/Color";
import { BrowserOptions, ImageDataAlt, NodeOptions } from "./types/Options";
/**
 * Extract colors from an ImageData object.
 *
 * @param imageData Data of the image
 * @param options Process configuration
 * @param options.pixels Total pixel number of the resized picture for calculation
 * @param options.distance From 0 to 1 is the color distance to not have near colors (1 distance is between white and black)
 * @param options.colorValidator Test function to enable only some colors
 * @param options.saturationDistance Minimum saturation value between two colors otherwise the colors will be merged (from 0 to 1)
 * @param options.lightnessDistance inimum lightness value between two colors otherwise the colors will be merged (from 0 to 1)
 * @param options.hueDistance inimum hue value between two colors otherwise the colors will be merged (from 0 to 1)
 * @param options.crossOrigin support for CORS (only for browser)
 * @param options.requestMode support for CORS (only for Web Workers in browser)
 *
 * @returns List of extracted colors
 */
export declare const extractColorsFromImageData: (imageData: ImageData | ImageDataAlt, options?: NodeOptions | BrowserOptions) => FinalColor[];
/**
 * Extract colors from an HTMLImageElement.
 * Browser only
 *
 * @param image HTML image element
 * @param options Process configuration
 * @param options.pixels Total pixel number of the resized picture for calculation
 * @param options.distance From 0 to 1 is the color distance to not have near colors (1 distance is between white and black)
 * @param options.colorValidator Test function to enable only some colors
 * @param options.saturationDistance Minimum saturation value between two colors otherwise the colors will be merged (from 0 to 1)
 * @param options.lightnessDistance inimum lightness value between two colors otherwise the colors will be merged (from 0 to 1)
 * @param options.hueDistance inimum hue value between two colors otherwise the colors will be merged (from 0 to 1)
 * @param options.crossOrigin support for CORS (only for browser)
 * @param options.requestMode support for CORS (only for Web Workers in browser)
 *
 * @returns List of extracted colors
 */
export declare const extractColorsFromImage: (image: HTMLImageElement, options?: BrowserOptions) => Promise<FinalColor[]>;
export declare const extractColorsFromImageBitmap: (image: ImageBitmap, options?: BrowserOptions) => Promise<FinalColor[]>;
/**
 * Extract colors from a path.
 * The image will be downloaded.
 *
 * @param src Image source
 * @param options Process configuration
 * @param options.pixels Total pixel number of the resized picture for calculation
 * @param options.distance From 0 to 1 is the color distance to not have near colors (1 distance is between white and black)
 * @param options.colorValidator Test function to enable only some colors
 * @param options.saturationDistance Minimum saturation value between two colors otherwise the colors will be merged (from 0 to 1)
 * @param options.lightnessDistance inimum lightness value between two colors otherwise the colors will be merged (from 0 to 1)
 * @param options.hueDistance inimum hue value between two colors otherwise the colors will be merged (from 0 to 1)
 * @param options.crossOrigin support for CORS (only for browser)
 * @param options.requestMode support for CORS (only for Web Workers in browser)
 *
 * @returns List of extracted colors
 */
export declare const extractColorsFromSrc: (src: string, options?: BrowserOptions) => Promise<FinalColor[]>;
/**
 * Extract colors from a picture.
 *
 * @param picture Image, image source or image data (node.js context only support image data)
 * @param options Process configuration
 * @param options.pixels Total pixel number of the resized picture for calculation
 * @param options.distance From 0 to 1 is the color distance to not have near colors (1 distance is between white and black)
 * @param options.colorValidator Test function to enable only some colors
 * @param options.saturationDistance Minimum saturation value between two colors otherwise the colors will be merged (from 0 to 1)
 * @param options.lightnessDistance inimum lightness value between two colors otherwise the colors will be merged (from 0 to 1)
 * @param options.hueDistance inimum hue value between two colors otherwise the colors will be merged (from 0 to 1)
 * @param options.crossOrigin support for CORS (only for browser)
 * @param options.requestMode support for CORS (only for Web Workers in browser)
 *
 * @returns List of extracted colors
 */
export declare const extractColors: (picture: string | HTMLImageElement | ImageData | ImageDataAlt, options?: BrowserOptions) => Promise<FinalColor[]>;
