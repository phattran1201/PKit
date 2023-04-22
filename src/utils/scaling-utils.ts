import { Dimensions } from 'react-native';

// Kích thước hướng dẫn mặc định dựa trên thiết bị di động màn hình iPhone8 tiêu chuẩn
const guidelineBaseWidth = 375; // với khung thiết kế
const guidelineBaseHeight = 812; // Khung thiết kế chiều cao

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const ratioX = window.width < 375 ? (window.width < 320 ? 0.75 : 0.875) : 1;
const responsiveFontSize = (value: number = 1, base: number = 14): number => {
  return base * ratioX * value;
};

const [shortDimension, longDimension] =
  window.width < window.height ? [window.width, window.height] : [window.height, window.width];
const [shortDimensionScreen, longDimensionScreen] =
  screen.width < screen.height ? [screen.width, screen.height] : [screen.height, screen.width];

const widthScale = (size = 1) => (shortDimension / guidelineBaseWidth) * size;
const heightScale = (size = 1) => (longDimension / guidelineBaseHeight) * size;

const windowWidth = (percent = 1) => shortDimension * percent;
const windowHeight = (percent = 1) => longDimension * percent;
const screenWidth = (percent = 1) => shortDimensionScreen * percent;
const screenHeight = (percent = 1) => longDimensionScreen * percent;

export {
  responsiveFontSize,
  widthScale,
  heightScale,
  windowWidth,
  windowHeight,
  screenWidth,
  screenHeight,
};
