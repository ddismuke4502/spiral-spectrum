import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/RootNavigator';
import { getResultBand } from '../services/screenerScoringService';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

function formatDomain(domain: string) {
  switch (domain) {
    case 'sensoryMotor':
      return 'Sensory / Motor';
    case 'focusedInterests':
      return 'Focused Interests';
    case 'communication':
      return 'Communication';
    case 'social':
      return 'Social';
    default:
      return domain;
  }
}

export function ResultsScreen({ navigation, route }: Props) {
  const { totalScore, maxScore, domainScores } = route.params;
  const resultBand = getResultBand(totalScore, maxScore);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Educational result</Text>
          <Text style={styles.score}>
            {totalScore}
            <Text style={styles.maxScore}> / {maxScore}</Text>
          </Text>
          <Text style={styles.resultLabel}>{resultBand.label}</Text>
          <Text style={styles.resultDescription}>{resultBand.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Domain breakdown</Text>

          {domainScores.map((domainScore) => {
            const percentage =
              domainScore.maxScore === 0 ? 0 : domainScore.score / domainScore.maxScore;

            return (
              <View key={domainScore.domain} style={styles.domainCard}>
                <View style={styles.domainHeader}>
                  <Text style={styles.domainName}>{formatDomain(domainScore.domain)}</Text>
                  <Text style={styles.domainScore}>
                    {domainScore.score} / {domainScore.maxScore}
                  </Text>
                </View>

                <View style={styles.track}>
                  <View style={[styles.fill, { width: `${percentage * 100}%` }]} />
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerTitle}>Important reminder</Text>
          <Text style={styles.disclaimerText}>
            This result is not a medical diagnosis. It is an educational reflection summary and
            should not replace evaluation or care from a qualified professional.
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <Pressable
            onPress={() => navigation.navigate('Test')}
            style={styles.primaryButton}
            accessibilityRole="button"
            accessibilityLabel="Retake screener"
          >
            <Text style={styles.primaryButtonText}>Retake Screener</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Resources')}
            style={styles.secondaryButton}
            accessibilityRole="button"
            accessibilityLabel="View educational resources"
          >
            <Text style={styles.secondaryButtonText}>View Resources</Text>
          </Pressable>
        </View>
      </ScrollView>
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
    gap: 24,
  },
  heroCard: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  score: {
    color: colors.text,
    fontSize: 56,
    fontWeight: '900',
  },
  maxScore: {
    color: colors.textMuted,
    fontSize: 26,
    fontWeight: '700',
  },
  resultLabel: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  resultDescription: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  domainCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  domainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  domainName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  domainScore: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '800',
  },
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.surfaceSoft,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  disclaimerBox: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disclaimerTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 8,
  },
  disclaimerText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  buttonGroup: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
});