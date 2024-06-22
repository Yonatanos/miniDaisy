import { View, type ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  isAnimated?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  isAnimated,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border');
  const props = {
    style: [{ backgroundColor, borderColor }, style],
    ...otherProps,
  };

  return isAnimated ? <Animated.View {...props} /> : <View {...props} />;
}
