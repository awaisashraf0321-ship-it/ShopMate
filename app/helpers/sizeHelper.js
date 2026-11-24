import { Dimensions, PixelRatio } from 'react-native';

const DESIGN_WIDTH = 1080;
const DESIGN_HEIGHT = 1920;

const getScreenSize = () => Dimensions.get('screen');

const calWp = widthPixel => {
  const { width } = getScreenSize();

  return PixelRatio.roundToNearestPixel((widthPixel / DESIGN_WIDTH) * width);
};

const calHp = heightPixel => {
  const { height } = getScreenSize();

  return PixelRatio.roundToNearestPixel((heightPixel / DESIGN_HEIGHT) * height);
};

const sizeHelper = {
  calHp,
  calWp,

  get screentHeight() {
    return getScreenSize().height;
  },

  get screenWidth() {
    return getScreenSize().width;
  },
};

export default sizeHelper;
