import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnswerOption } from '../components/AnswerOption';
import { ProgressBar } from '../components/ProgressBar';
import { useScreenerTest } from '../hooks/useScreenerTest';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme/colors';
import { AnswerValue } from '../types/screener';

type Props = NativeStackScreenProps<RootStackParamList, 'Test'>;

const answerOptions: Array<{
  value: AnswerValue;
  label: string;
  description: string;
}> = [
  {
    value: 'never',
    label: 'Never true',
    description: 'This has not generally described me.',
  },
  {
    value: 'younger',
    label: 'True mostly earlier in life',
    description: 'This was more true when I was younger.',
  },
  {
    value: 'now',
    label: 'True mostly now',
    description: 'This is more true for me currently.',
  },
  {
    value: 'nowAndYoung',
    label: 'True now and earlier in life',
    description: 'This has been true across different stages of my life.',
  },
];

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

export function TestScreen({ navigation }: Props) {
  const {
    currentIndex,
    currentQuestion,
    selectedAnswer,
    totalQuestions,
    progress,
    totalScore,
    maxScore,
    domainScores,
    isFirstQuestion,
    isLastQuestion,
    canGoNext,
    selectAnswer,
    goPrevious,
    goNext,
  } = useScreenerTest();

  const handlePrimaryAction = useCallback(() => {
    if (!canGoNext) {
      return;
    }

    if (isLastQuestion) {
      navigation.navigate('Results', {
        totalScore,
        maxScore,
        domainScores,
      });
      return;
    }

    goNext();
  }, [canGoNext, domainScores, goNext, isLastQuestion, maxScore, navigation, totalScore]);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>
            Question {currentIndex + 1} of {totalQuestions}
          </Text>

          <ProgressBar progress={progress} />

          <Text style={styles.domain}>{formatDomain(currentQuestion.domain)}</Text>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
        </View>

        <View style={styles.answerGroup}>
          {answerOptions.map((option) => (
            <AnswerOption
              key={option.value}
              value={option.value}
              label={option.label}
              description={option.description}
              isSelected={selectedAnswer === option.value}
              onSelect={selectAnswer}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Pressable
            onPress={goPrevious}
            disabled={isFirstQuestion}
            style={[styles.secondaryButton, isFirstQuestion && styles.disabledButton]}
            accessibilityRole="button"
            accessibilityLabel="Go to previous question"
          >
            <Text style={[styles.secondaryButtonText, isFirstQuestion && styles.disabledText]}>
              Previous
            </Text>
          </Pressable>

          <Pressable
            onPress={handlePrimaryAction}
            disabled={!canGoNext}
            style={[styles.primaryButton, !canGoNext && styles.disabledButton]}
            accessibilityRole="button"
            accessibilityLabel={isLastQuestion ? 'Finish screening' : 'Go to next question'}
          >
            <Text style={[styles.primaryButtonText, !canGoNext && styles.disabledText]}>
              {isLastQuestion ? 'Finish' : 'Next'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.disclaimer}>
          This screener is for educational reflection only. It is not a diagnosis.
        </Text>
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
  header: {
    gap: 14,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  domain: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '700',
  },
  questionCard: {
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  questionText: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '800',
  },
  answerGroup: {
    gap: 12,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
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
    flex: 1,
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
  disabledButton: {
    opacity: 0.45,
  },
  disabledText: {
    color: colors.textMuted,
  },
  disclaimer: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});