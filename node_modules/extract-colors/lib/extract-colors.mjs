const EXTRACTOR_PIXELS_DEFAULT = 64e3;
const EXTRACTOR_DISTANCE_DEFAULT = 0.22;
const AVERAGE_HUE_DEFAULT = 1 / 12;
const AVERAGE_SATURATION_DEFAULT = 1 / 5;
const AVERAGE_LIGHTNESS_DEFAULT = 1 / 5;
function testInputs({
  pixels = EXTRACTOR_PIXELS_DEFAULT,
  distance: distance2 = EXTRACTOR_DISTANCE_DEFAULT,
  colorValidator = (_red, _green, _blue, _alpha) => (_alpha ?? 255) > 250,
  hueDistance: hueDistance2 = AVERAGE_HUE_DEFAULT,
  saturationDistance = AVERAGE_LIGHTNESS_DEFAULT,
  lightnessDistance = AVERAGE_SATURATION_DEFAULT,
  crossOrigin = "",
  requestMode = "cors"
} = {}) {
  const testUint = (label, val, min = 0, max = Number.MAX_SAFE_INTEGER) => {
    if (!Number.isInteger(val)) {
      throw new Error(`${label} is not a valid number (${val})`);
    }
    if (val < min) {
      console.warn(`${label} can not be less than ${min} (it's ${val})`);
    }
    if (val > max) {
      console.warn(`${label} can not be more than ${max} (it's ${val})`);
    }
    return Math.min(Math.max(val, min), max);
  };
  const testNumber = (label, val, min = 0, max = Number.MAX_VALUE) => {
    if (Number(val) !== val) {
      throw new Error(`${label} is not a valid number (${val})`);
    }
    if (val < min) {
      console.warn(`${label} can not be less than ${min} (it's ${val})`);
    }
    if (val > max) {
      console.warn(`${label} can not be more than ${max} (it's ${val})`);
    }
    return Math.min(Math.max(val, min), max);
  };
  const testFunction = (label, val) => {
    if (!val || {}.toString.call(val) !== "[object Function]") {
      throw new Error(`${label} is not a function (${val})`);
    }
    return val;
  };
  const testValueInList = (label, val, list) => {
    if (list.indexOf(val) < 0) {
      console.warn(
        `${label} can be one of this values ${list.map((v) => `"${v}"`).join(", ")} (it's "${val}")`
      );
    }
  };
  testUint("pixels", pixels || 0, 1);
  testNumber("distance", distance2, 0, 1);
  testFunction("colorValidator", colorValidator);
  testNumber("hueDistance", hueDistance2, 0, 1);
  testNumber("saturationDistance", saturationDistance, 0, 1);
  testNumber("lightnessDistance", lightnessDistance, 0, 1);
  testValueInList("crossOrigin", crossOrigin, [
    "",
    "anonymous",
    "use-credentials"
  ]);
  testValueInList("requestMode", requestMode, [
    "cors",
    "navigate",
    "no-cors",
    "same-origin"
  ]);
}
const cleanInputs = ({
  pixels = EXTRACTOR_PIXELS_DEFAULT,
  distance: distance2 = EXTRACTOR_DISTANCE_DEFAULT,
  colorValidator = (_red, _green, _blue, _alpha) => (_alpha ?? 255) > 250,
  hueDistance: hueDistance2 = AVERAGE_HUE_DEFAULT,
  saturationDistance = AVERAGE_LIGHTNESS_DEFAULT,
  lightnessDistance = AVERAGE_SATURATION_DEFAULT,
  crossOrigin = "",
  requestMode = "cors"
} = {}) => {
  return [
    Math.max(pixels, 1),
    Math.min(Math.max(distance2, 0), 1),
    colorValidator,
    Math.min(Math.max(hueDistance2, 0), 1),
    Math.min(Math.max(saturationDistance, 0), 1),
    Math.min(Math.max(lightnessDistance, 0), 1),
    crossOrigin,
    requestMode
  ];
};
class Color {
  /**
   * Set red, green and blue colors to create the Color object.
   */
  constructor(red, green, blue, hex = red << 16 | green << 8 | blue) {
    this._count = 1;
    this.__saturation = -1;
    this.__hue = -1;
    this.__lightness = -1;
    this.__intensity = -1;
    this._red = red;
    this._green = green;
    this._blue = blue;
    this._hex = hex;
  }
  /**
   * Distance between two colors.
   * - Minimum is 0 (between two same colors)
   * - Maximum is 1 (for example between black and white)
   */
  static distance(colorA, colorB) {
    return (Math.abs(colorB._red - colorA._red) + Math.abs(colorB._green - colorA._green) + Math.abs(colorB._blue - colorA._blue)) / (3 * 255);
  }
  clone() {
    const color = new Color(this._red, this._green, this._blue, this._hex);
    color._count = this._count;
    return color;
  }
  updateHSL() {
    const red = this._red / 255;
    const green = this._green / 255;
    const blue = this._blue / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    this.__lightness = (max + min) / 2;
    if (max === min) {
      this.__hue = 0;
      this.__saturation = 0;
      this.__intensity = 0;
    } else {
      const distance2 = max - min;
      this.__saturation = this.__lightness > 0.5 ? distance2 / (2 - max - min) : distance2 / (max + min);
      this.__intensity = this.__saturation * ((0.5 - Math.abs(0.5 - this.__lightness)) * 2);
      switch (max) {
        case red:
          this.__hue = ((green - blue) / distance2 + (green < blue ? 6 : 0)) / 6;
          break;
        case green:
          this.__hue = ((blue - red) / distance2 + 2) / 6;
          break;
        case blue:
          this.__hue = ((red - green) / distance2 + 4) / 6;
          break;
      }
    }
  }
  /**
   * Hue from 0 to 1
   */
  get _hue() {
    if (this.__hue === -1) {
      this.updateHSL();
    }
    return this.__hue;
  }
  /**
   * Saturation from 0 to 1
   */
  get _saturation() {
    if (this.__saturation === -1) {
      this.updateHSL();
    }
    return this.__saturation;
  }
  /**
   * Lightness from 0 to 1
   */
  get _lightness() {
    if (this.__lightness === -1) {
      this.updateHSL();
    }
    return this.__lightness;
  }
  /**
   * Color intensity from 0 to 1
   */
  get _intensity() {
    if (this.__intensity === -1) {
      this.updateHSL();
    }
    return this.__intensity;
  }
}
class LeafGroup {
  /**
   * Store colors or groups and _count similiar groups in the image.
   */
  constructor() {
    this._count = 0;
    this._children = {};
  }
  /**
   * Add color to the group.
   *
   * @param _hex Hexadecimal value of the color
   * @param _red Red chanel amount of the color
   * @param _green Green chanel amount of the color
   * @param _blue Blue chanel amount of the color
   * @returns The color
   */
  addColor(_hex, _red, _green, _blue) {
    this._count++;
    if (this._children[_hex]) {
      this._children[_hex]._count++;
    } else {
      this._children[_hex] = new Color(_red, _green, _blue, _hex);
    }
    return this._children[_hex];
  }
  /**
   * Get list of groups of list of colors.
   *
   * @returns List of colors
   */
  getList() {
    return Object.keys(this._children).map(
      (key) => this._children[key]
    );
  }
  /**
   * Representative color of leaf.
   *
   * @returns Main color of the leaf
   */
  createMainColor() {
    const list = this.getList();
    const biggest = list.reduce((a, b) => a._count >= b._count ? a : b);
    const main = biggest.clone();
    main._count = this._count;
    return main;
  }
}
class RootGroup {
  /**
   * Store colors or groups and _count similiar groups in the image.
   */
  constructor() {
    this._count = 0;
    this._children = {};
  }
  /**
   * Get list of groups of list of colors.
   */
  getList() {
    return Object.keys(this._children).map(
      (key) => this._children[key]
    );
  }
  addColor(r, g, b) {
    const full = r << 16 | g << 8 | b;
    const loss = (r >> 4 & 15) << 8 | (g >> 4 & 15) << 4 | b >> 4 & 15;
    this._count++;
    return this.getLeafGroup(loss).addColor(full, r, g, b);
  }
  /**
   * Add a key for a color, this key is a simplification to find neighboring colors.
   * Neighboring colors has same key.
   */
  getLeafGroup(key) {
    if (!this._children[key]) {
      this._children[key] = new LeafGroup();
    }
    return this._children[key];
  }
  /**
   * List of colors sorted by importance (neighboring hare calculated by distance and removed).
   * Importance is calculated with the saturation and _count of neighboring colors.
   */
  getColors(_distance) {
    const list = this.getList().map((child) => child.createMainColor());
    list.sort((a, b) => b._count - a._count);
    const newList = [];
    while (list.length) {
      const current = list.shift();
      list.filter((color) => Color.distance(current, color) < _distance).forEach((near) => {
        current._count += near._count;
        const i = list.findIndex((color) => color === near);
        list.splice(i, 1);
      });
      newList.push(current);
    }
    return newList;
  }
}
const extractor = ({
  data,
  width,
  height
}, _pixels, _distance, _colorValidator) => {
  const colorGroup = new RootGroup();
  const reducer = width && height ? Math.floor(width * height / _pixels) || 1 : 1;
  let ignoredColorsCount = 0;
  for (let i = 0; i < data.length; i += 4 * reducer) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (_colorValidator(r, g, b, a)) {
      colorGroup.addColor(r, g, b);
    } else {
      ignoredColorsCount++;
    }
  }
  return {
    colors: colorGroup.getColors(_distance),
    count: colorGroup._count + ignoredColorsCount
  };
};
const distance = (a, b) => Math.abs(a - b);
const hueDistance = (a, b) => Math.min(distance(a, b), distance((a + 0.5) % 1, (b + 0.5) % 1));
class AverageGroup {
  constructor() {
    this.colors = [];
    this._average = null;
  }
  addColor(color) {
    this.colors.push(color);
    this._average = null;
  }
  isSamePalette(color, hue, saturation, lightness) {
    for (const currentColor of this.colors) {
      const isSame = hueDistance(currentColor._hue, color._hue) < hue && distance(currentColor._saturation, color._saturation) < saturation && distance(currentColor._lightness, color._lightness) < lightness;
      if (!isSame) {
        return false;
      }
    }
    return true;
  }
  get average() {
    if (!this._average) {
      const { r, g, b } = this.colors.reduce(
        (total2, color) => {
          total2.r += color._red;
          total2.g += color._green;
          total2.b += color._blue;
          return total2;
        },
        { r: 0, g: 0, b: 0 }
      );
      const total = this.colors.reduce(
        (_count, color) => _count + color._count,
        0
      );
      this._average = new Color(
        Math.round(r / this.colors.length),
        Math.round(g / this.colors.length),
        Math.round(b / this.colors.length)
      );
      this._average._count = total;
    }
    return this._average;
  }
}
class AverageManager {
  constructor(hue, saturation, lightness) {
    this._groups = [];
    this._hue = hue;
    this._saturation = saturation;
    this._lightness = lightness;
  }
  addColor(color) {
    const samePalette = this._groups.find(
      (averageGroup) => averageGroup.isSamePalette(
        color,
        this._hue,
        this._saturation,
        this._lightness
      )
    );
    if (samePalette) {
      samePalette.addColor(color);
    } else {
      const averageGroup = new AverageGroup();
      averageGroup.addColor(color);
      this._groups.push(averageGroup);
    }
  }
  getGroups() {
    return this._groups.map((averageGroup) => averageGroup.average);
  }
}
const sortColors = (list, _pixels, _hueDistance, _saturationDistance, _lightnessDistance) => {
  const averageManager = new AverageManager(
    _hueDistance,
    _saturationDistance,
    _lightnessDistance
  );
  list.forEach((color) => averageManager.addColor(color));
  const sorted = averageManager.getGroups();
  sorted.sort((a, b) => {
    const bPower = (b._intensity + 0.1) * (0.9 - b._count / _pixels);
    const aPower = (a._intensity + 0.1) * (0.9 - a._count / _pixels);
    return bPower - aPower;
  });
  return sorted;
};
const createFinalColor = (color, pixels) => {
  return {
    hex: `#${"0".repeat(
      6 - color._hex.toString(16).length
    )}${color._hex.toString(16)}`,
    red: color._red,
    green: color._green,
    blue: color._blue,
    area: color._count / pixels,
    hue: color._hue,
    saturation: color._saturation,
    lightness: color._lightness,
    intensity: color._intensity
  };
};
const checkIsBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";
const checkIsWorker = () => typeof self === "object" && self.constructor && self.constructor.name === "DedicatedWorkerGlobalScope";
const checkIsNode = () => typeof window === "undefined" && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
typeof process !== "undefined" && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
process.versions != null && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
process.versions.node != null;
const sortFinalColors = (_colors, _pixels, _hueDistance, _saturationDistance, _lightnessDistance) => {
  const list = sortColors(
    _colors,
    _pixels,
    _hueDistance,
    _saturationDistance,
    _lightnessDistance
  );
  return list.map((color) => createFinalColor(color, _pixels));
};
const extractImageData = (_image, _pixels) => {
  const currentPixels = _image.width * _image.height;
  const width = currentPixels < _pixels ? _image.width : Math.round(_image.width * Math.sqrt(_pixels / currentPixels));
  const height = currentPixels < _pixels ? _image.height : Math.round(_image.height * Math.sqrt(_pixels / currentPixels));
  const canvas = ((width2, height2) => {
    if (checkIsWorker()) {
      return new OffscreenCanvas(width2, height2);
    }
    const canvas2 = document.createElement("canvas");
    canvas2.width = width2;
    canvas2.height = height2;
    return canvas2;
  })(width, height);
  const context = canvas.getContext("2d");
  context.drawImage(
    _image,
    0,
    0,
    _image.width,
    _image.height,
    0,
    0,
    width,
    height
  );
  return context.getImageData(0, 0, width, height);
};
const extractColorsFromImageData = (imageData, options = {}) => {
  if (process.env.NODE_ENV !== "production") {
    testInputs(options);
  }
  const [
    _pixels,
    _distance,
    _colorValidator,
    _hueDistance,
    _saturationDistance,
    _lightnessDistance
  ] = cleanInputs(options);
  const { colors, count } = extractor(
    imageData,
    _pixels,
    _distance,
    _colorValidator
  );
  return sortFinalColors(
    colors,
    count,
    _hueDistance,
    _saturationDistance,
    _lightnessDistance
  );
};
const extractColorsFromImage = async (image, options = {}) => {
  if (checkIsNode()) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "Use extractColors instead extractColorsFromImage for Node.js"
      );
    }
    return [];
  }
  if (process.env.NODE_ENV !== "production") {
    testInputs(options);
  }
  const [
    _pixels,
    _distance,
    _colorValidator,
    _hueDistance,
    _saturationDistance,
    _lightnessDistance,
    _crossOrigin
  ] = cleanInputs(options);
  image.crossOrigin = _crossOrigin;
  return new Promise((resolve) => {
    const extract = (image2) => {
      const imageData = extractImageData(image2, _pixels);
      const { colors, count } = extractor(
        imageData,
        _pixels,
        _distance,
        _colorValidator
      );
      resolve(
        sortFinalColors(
          colors,
          count,
          _hueDistance,
          _saturationDistance,
          _lightnessDistance
        )
      );
    };
    if (image.complete) {
      extract(image);
    } else {
      const imageLoaded = () => {
        image.removeEventListener("load", imageLoaded);
        extract(image);
      };
      image.addEventListener("load", imageLoaded);
    }
  });
};
const extractColorsFromImageBitmap = async (image, options = {}) => {
  if (checkIsNode()) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "Use extractColors instead extractColorsFromImageBitmap for Node.js"
      );
    }
    return [];
  }
  if (process.env.NODE_ENV !== "production") {
    testInputs(options);
  }
  const [
    _pixels,
    _distance,
    _colorValidator,
    _hueDistance,
    _saturationDistance,
    _lightnessDistance
  ] = cleanInputs(options);
  const imageData = extractImageData(image, _pixels);
  const { colors, count } = extractor(
    imageData,
    _pixels,
    _distance,
    _colorValidator
  );
  return sortFinalColors(
    colors,
    count,
    _hueDistance,
    _saturationDistance,
    _lightnessDistance
  );
};
const extractColorsFromSrc = async (src, options = {}) => {
  if (checkIsNode()) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("Can not use extractColorsFromSrc for Node.js");
    }
    return [];
  }
  if (process.env.NODE_ENV !== "production") {
    testInputs(options);
  }
  if (checkIsWorker()) {
    const inputs = cleanInputs(options);
    const response = await fetch(src, { mode: inputs[7] });
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);
    const colors = await extractColorsFromImageBitmap(bitmap, options);
    bitmap.close();
    return colors;
  }
  const image = new Image();
  image.src = src;
  return extractColorsFromImage(image, options);
};
const extractColors = (picture, options) => {
  if (checkIsBrowser()) {
    if (process.env.NODE_ENV !== "production") {
      if (options == null ? void 0 : options.requestMode) {
        console.warn(
          "options.requestMode not supported in Browser, use options.crossOrigin instead"
        );
      }
    }
    if (picture instanceof Image) {
      return extractColorsFromImage(picture, options);
    }
    if (picture instanceof ImageData || picture instanceof Object && picture.data) {
      return new Promise((resolve) => {
        resolve(extractColorsFromImageData(picture, options));
      });
    }
    if (typeof picture === "string") {
      return extractColorsFromSrc(picture, options);
    }
  }
  if (checkIsWorker()) {
    if (process.env.NODE_ENV !== "production") {
      if (options == null ? void 0 : options.crossOrigin) {
        console.warn(
          "options.crossOrigin not supported in Web Worker, use options.requestMode instead"
        );
      }
    }
    if (picture instanceof ImageData || picture instanceof Object && picture.data) {
      return new Promise((resolve) => {
        resolve(
          extractColorsFromImageData(
            picture,
            options
          )
        );
      });
    }
    if (typeof picture === "string") {
      return extractColorsFromSrc(picture, options);
    }
    if (picture.src) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "HTMLImageElement not enable on worker, a fallback is used to extract src from your HTMLImageElement, please send 'src' instead HTMLImageElement"
        );
      }
      return extractColorsFromSrc(picture.src, options);
    }
  }
  if (checkIsNode()) {
    if (process.env.NODE_ENV !== "production") {
      if (picture instanceof String) {
        throw new Error(
          "Send imageData to extractColors (Image src or HTMLImageElement not supported in Nodejs)"
        );
      }
      if (!picture.data) {
        throw new Error("Send imageData to extractColors");
      }
      if (options == null ? void 0 : options.crossOrigin) {
        console.warn("options.crossOrigin not supported in Node.js");
      }
    }
    return new Promise((resolve) => {
      resolve(
        extractColorsFromImageData(picture, options)
      );
    });
  }
  throw new Error(`Can not analyse picture`);
};
export {
  extractColors,
  extractColorsFromImage,
  extractColorsFromImageBitmap,
  extractColorsFromImageData,
  extractColorsFromSrc
};
//# sourceMappingURL=extract-colors.mjs.map
