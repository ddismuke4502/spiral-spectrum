import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SpiralLogo } from '../components/SpiralLogo';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.content}>
        <SpiralLogo size={190} />

        <View style={styles.textGroup}>
          <Text style={styles.eyebrow}>Educational self-screening</Text>
          <Text style={styles.title}>Spiral Spectrum</Text>
          <Text style={styles.subtitle}>
            A calm, privacy-conscious mobile screening experience for reflecting on adult autism-related traits.
          </Text>
        </View>

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerTitle}>Important disclaimer</Text>
          <Text style={styles.disclaimerText}>
            This app is not a diagnosis and does not replace care from a qualified medical or mental health professional.
            Your result is only a starting point for reflection and conversation.
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('Test')}>
            <Text style={styles.primaryButtonText}>Start Screening</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Resources')}>
            <Text style={styles.secondaryButtonText}>View Resources</Text>
          </Pressable>

          <Pressable style={styles.linkButton} onPress={() => navigation.navigate('History')}>
            <Text style={styles.linkButtonText}>Past Results</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
  },
  textGroup: {
    alignItems: 'center',
    gap: 10,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  title: {
    color: colors.text,
    fontSize: 38,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  disclaimerBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
  },
  disclaimerTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  disclaimerText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  buttonGroup: {
    width: '100%',
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
    fontWeight: '800',
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
    fontWeight: '700',
  },
  linkButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  linkButtonText: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '600',
  },
});