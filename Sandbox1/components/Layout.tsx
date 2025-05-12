import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';

interface LayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  useSafeArea?: boolean;
}

export function Layout({ children, style, useSafeArea = true }: LayoutProps) {
  const colorScheme = useColorScheme();
  const Container = useSafeArea ? SafeAreaView : View;

  return (
    <Container
      style={[
        styles.container,
        {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        },
        style,
      ]}>
      <View style={styles.content}>{children}</View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});