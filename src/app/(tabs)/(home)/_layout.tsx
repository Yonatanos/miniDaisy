import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getTranslation } from '@/translations';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const HomeLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          gestureEnabled: false,
          headerStyle: { backgroundColor: Colors.daisy },
          headerTintColor: Colors.white,
          animation: 'slide_from_left',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: getTranslation('routing:firstTab'),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="residents/[id]"
          options={{
            headerTitle: getTranslation('routing:residentsPageTitle'),
            headerTitleAlign: 'center',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default HomeLayout;
