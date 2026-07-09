import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResourceCard } from '../components/ResourceCard';
import { useResources } from '../hooks/useResources';
import { colors } from '../theme/colors';
import { EducationalResource } from '../types/resource';

export function ResourcesScreen() {
  const { resources, isLoading, isRefreshing, errorMessage, refreshResources } =
    useResources();

  const renderResource = useCallback(
    ({ item }: { item: EducationalResource }) => <ResourceCard resource={item} />,
    []
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading educational resources...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={resources}
        keyExtractor={(item) => item.id}
        renderItem={renderResource}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshResources} />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Educational support</Text>
            <Text style={styles.title}>Resources</Text>
            <Text style={styles.subtitle}>
              These links are for learning and reflection. They do not replace
              professional medical or mental health guidance.
            </Text>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 24,
    paddingBottom: 36,
  },
  separator: {
    height: 14,
  },
  header: {
    marginBottom: 22,
    gap: 10,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 14,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 15,
    textAlign: 'center',
  },
});