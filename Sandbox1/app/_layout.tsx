import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Layout } from '@/components/Layout';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Layout useSafeArea={false}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
              },
              headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
              headerShadowVisible: false,
              contentStyle: {
                backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
              },
            }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="+not-found"
              options={{
                title: 'Not Found',
                presentation: 'modal'
              }}
            />
          </Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </Layout>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
