import { BrowserOptions, OptionsCleaned } from "../types/Options";
/**
 * Default extractor values
 */
export declare const EXTRACTOR_PIXELS_DEFAULT = 64000;
export declare const EXTRACTOR_DISTANCE_DEFAULT = 0.22;
/**
 * Default average values
 */
export declare const AVERAGE_HUE_DEFAULT: number;
export declare const AVERAGE_SATURATION_DEFAULT: number;
export declare const AVERAGE_LIGHTNESS_DEFAULT: number;
export declare function testInputs({ pixels, distance, colorValidator, hueDistance, saturationDistance, lightnessDistance, crossOrigin, requestMode, }?: BrowserOptions): void;
declare const _default: ({ pixels, distance, colorValidator, hueDistance, saturationDistance, lightnessDistance, crossOrigin, requestMode, }?: BrowserOptions) => OptionsCleaned;
export default _default;
