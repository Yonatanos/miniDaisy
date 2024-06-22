import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const HomeLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          gestureEnabled: false, // Disable swipe gesture
          // headerBackground: Colors.daisy,
          headerStyle: { backgroundColor: Colors.daisy }, // Set your desired background color here
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: 'Scanned',
          }}
        />
        <Stack.Screen
          name="residents/[id]"
          options={{
            title: 'User Packages',
            headerTitle: 'User Packages',
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
};

export default HomeLayout;
