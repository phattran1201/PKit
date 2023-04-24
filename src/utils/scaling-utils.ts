import { Dimensions } from 'react-native';

// The guidelineBaseWidth is used as a reference width for scaling other elements in the design
const guidelineBaseWidth = 375;

// The guidelineBaseHeight is used as a reference height for scaling other elements in the design
const guidelineBaseHeight = 812;

// Retrieve the dimensions of the device's screen and window
const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

// Calculate the scaling ratio for font sizes based on the width of the device's screen
const ratioX = window.width < 375 ? (window.width < 320 ? 0.75 : 0.875) : 1;

/**
 * Returns a font size that scales according to the device's screen width.
 * @param value - A number representing the desired font size.
 * @param base - An optional number representing the base font size. Defaults to 14.
 * @returns A number representing the scaled font size.
 */
const responsiveFontSize = (value: number = 1, base: number = 14): number => {
  return base * ratioX * value;
};

// Determine the short and long dimensions of the device's window
const [shortDimension, longDimension] =
  window.width < window.height ? [window.width, window.height] : [window.height, window.width];

// Determine the short and long dimensions of the device's screen
const [shortDimensionScreen, longDimensionScreen] =
  screen.width < screen.height ? [screen.width, screen.height] : [screen.height, screen.width];

/**
 * Returns a number representing the scaled width of an element.
 * @param size - An optional number representing the desired width. Defaults to 1.
 * @returns A number representing the scaled width.
 */
const widthScale = (size: number = 1): number => {
  return (shortDimension / guidelineBaseWidth) * size;
};

/**
 * Returns a number representing the scaled height of an element.
 * @param size - An optional number representing the desired height. Defaults to 1.
 * @returns A number representing the scaled height.
 */
const heightScale = (size: number = 1): number => {
  return (longDimension / guidelineBaseHeight) * size;
};

/**
 * Returns a number representing the calculated width of the device's window.
 * @param percent - An optional number representing the percentage of the total width. Defaults to 1.
 * @returns A number representing the calculated width of the device's window.
 */
const windowWidth = (percent: number = 1): number => {
  return shortDimension * percent;
};

/**
 * Returns a number representing the calculated height of the device's window.
 * @param percent - An optional number representing the percentage of the total height. Defaults to 1.
 * @returns A number representing the calculated height of the device's window.
 */
const windowHeight = (percent: number = 1): number => {
  return longDimension * percent;
};

/**
 * Returns a number representing the calculated width of the device's screen.
 * @param percent - An optional number representing the percentage of the total width. Defaults to 1.
 * @returns A number representing the calculated width of the device's screen.
 */
const screenWidth = (percent: number = 1): number => {
  return shortDimensionScreen * percent;
};

/**
 * Returns a number representing the calculated height of the device's screen.
 * @param percent - An optional number representing the percentage of the total height. Defaults to 1.
 * @returns A number representing the calculated height of the device's screen.
 */
const screenHeight = (percent: number = 1): number => {
  return longDimensionScreen * percent;
};

// Export all of the functions and variables declared above for use in other modules
export {
  responsiveFontSize,
  widthScale,
  heightScale,
  windowWidth,
  windowHeight,
  screenWidth,
  screenHeight,
};
