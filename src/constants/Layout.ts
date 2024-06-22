import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const STANDARD_GAP = 16;
export default {
  standardGap: STANDARD_GAP,
  smallGap: STANDARD_GAP / 2,
  screenWidth: SCREEN_WIDTH,
  maxContentWidth: SCREEN_WIDTH - 2 * STANDARD_GAP,
};
