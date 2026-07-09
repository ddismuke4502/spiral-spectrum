import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  clearSavedResults,
  getSavedResults,
} from '../services/resultHistoryStorage';
import { colors } from '../theme/colors';
import { SavedScreenerResult } from '../types/screener';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export function HistoryScreen() {
  const [results, setResults] = useState<SavedScreenerResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadResults = useCallback(async () => {
    const savedResults = await getSavedResults();

    setResults(savedResults);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadResults();
    }, [loadResults])
  );

  const handleClearHistory = useCallback(async () => {
    await clearSavedResults();
    setResults([]);
  }, []);

  const renderResult = useCallback(
    ({ item }: { item: SavedScreenerResult }) => (
      <View style={styles.resultCard}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultDate}>{formatDate(item.completedAt)}</Text>
          <Text style={styles.resultScore}>
            {item.totalScore} / {item.maxScore}
          </Text>
        </View>

        <Text style={styles.resultText}>
          Saved locally on this device. This is an educational reflection result,
          not a diagnosis.
        </Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderResult}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Local history</Text>
            <Text style={styles.title}>Past Results</Text>
            <Text style={styles.subtitle}>
              Results are stored locally on this device using AsyncStorage.
            </Text>

            {results.length > 0 ? (
              <Pressable
                onPress={handleClearHistory}
                style={styles.clearButton}
                accessibilityRole="button"
                accessibilityLabel="Clear saved result history"
              >
                <Text style={styles.clearButtonText}>Clear History</Text>
              </Pressable>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              {isLoading ? 'Loading results...' : 'No saved results yet'}
            </Text>
            <Text style={styles.emptyText}>
              Complete the screener and tap Save Result to store a result here.
            </Text>
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
  content: {
    padding: 24,
    paddingBottom: 36,
  },
  separator: {
    height: 14,
  },
  header: {
    gap: 10,
    marginBottom: 22,
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
  clearButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
  },
  clearButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  resultCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  resultDate: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
  },
  resultScore: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '900',
  },
  resultText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  emptyCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});