import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const QuickActionButton = ({ title, icon, onPress }: { title: string; icon: string; onPress: () => void }) => {
  const theme = useColorScheme() ?? 'light';
  return (
    <TouchableOpacity onPress={onPress} style={styles.quickActionButton}>
      <View style={styles.quickActionIconContainer}>
        <IconSymbol
          name={icon as any}
          size={28}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
      </View>
      <ThemedText type="defaultSemiBold" style={styles.quickActionText}>{title}</ThemedText>
    </TouchableOpacity>
  );
};

const RecentActivityItem = ({ title, date, type }: { title: string; date: string; type: string }) => {
  const theme = useColorScheme() ?? 'light';
  return (
    <Link href="/(tabs)/explore" asChild>
      <TouchableOpacity>
        <ThemedView style={styles.recentItem}>
          <View style={styles.recentItemLeft}>
            <IconSymbol
              name={type === 'project' ? 'folder.fill' : 'doc.fill'}
              size={24}
              color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
            />
            <View>
              <ThemedText type="defaultSemiBold">{title}</ThemedText>
              <ThemedText style={styles.recentItemDate}>{date}</ThemedText>
            </View>
          </View>
          <IconSymbol
            name="chevron.right"
            size={20}
            color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          />
        </ThemedView>
      </TouchableOpacity>
    </Link>
  );
};

export default function HomeScreen() {
  const theme = useColorScheme() ?? 'light';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
          contentFit="contain"
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome Back!</ThemedText>
          <HelloWave />
        </ThemedView>

        {/* Quick Actions Section */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Actions</ThemedText>
          <ThemedView style={styles.quickActionsGrid}>
            <QuickActionButton
              title="New Project"
              icon="plus.circle.fill"
              onPress={() => {/* TODO: Implement new project creation */}}
            />
            <QuickActionButton
              title="Recent Files"
              icon="folder.fill"
              onPress={() => {/* TODO: Implement recent files */}}
            />
            <QuickActionButton
              title="Settings"
              icon="gear"
              onPress={() => {/* TODO: Implement settings */}}
            />
            <QuickActionButton
              title="Help"
              icon="questionmark.circle"
              onPress={() => {/* TODO: Implement help */}}
            />
          </ThemedView>
        </ThemedView>

        {/* Recent Activity Section */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Activity</ThemedText>
          <ThemedView style={styles.recentActivityList}>
            <RecentActivityItem
              title="Mobile App Design"
              date="Updated 2h ago"
              type="project"
            />
            <RecentActivityItem
              title="Project Documentation"
              date="Created yesterday"
              type="document"
            />
            <RecentActivityItem
              title="UI Components"
              date="Updated 3d ago"
              type="project"
            />
          </ThemedView>
        </ThemedView>

        {/* Platform Specific Features */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Tools & Resources</ThemedText>
          <ThemedView style={styles.platformFeatures}>
            <IconSymbol
              name="keyboard"
              size={24}
              color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
              style={styles.platformIcon}
            />
            {Platform.select({
              ios: (
                <ThemedText style={styles.platformText}>
                  Shake your device or press <ThemedText type="defaultSemiBold">⌘D</ThemedText> for developer menu
                </ThemedText>
              ),
              android: (
                <ThemedText style={styles.platformText}>
                  Shake your device or press <ThemedText type="defaultSemiBold">⌘M</ThemedText> for developer menu
                </ThemedText>
              ),
              web: (
                <ThemedText style={styles.platformText}>
                  Press <ThemedText type="defaultSemiBold">F12</ThemedText> to open developer tools
                </ThemedText>
              ),
            })}
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Platform.OS === 'web' ? 24 : 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
    marginTop: 8,
  },
  section: {
    gap: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  quickActionButton: {
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Platform.select({
      ios: '#00000010',
      android: '#00000010',
      web: '#00000008',
    }),
    width: Platform.OS === 'web' ? '23%' : '47%',
    minWidth: 140,
  },
  quickActionIconContainer: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: Platform.select({
      ios: '#00000008',
      android: '#00000008',
      web: '#00000005',
    }),
  },
  quickActionText: {
    textAlign: 'center',
  },
  recentActivityList: {
    gap: 12,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    backgroundColor: Platform.select({
      ios: '#00000008',
      android: '#00000008',
      web: '#00000005',
    }),
  },
  recentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recentItemDate: {
    fontSize: 12,
    opacity: 0.6,
  },
  platformFeatures: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    backgroundColor: Platform.select({
      ios: '#00000008',
      android: '#00000008',
      web: '#00000005',
    }),
  },
  platformIcon: {
    marginRight: 16,
  },
  platformText: {
    flex: 1,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
