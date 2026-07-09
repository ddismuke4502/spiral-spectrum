import { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { AnswerValue } from '../types/screener';

type AnswerOptionProps = {
  value: AnswerValue;
  label: string;
  description: string;
  isSelected: boolean;
  onSelect: (value: AnswerValue) => void;
};

function AnswerOptionComponent({
  value,
  label,
  description,
  isSelected,
  onSelect,
}: AnswerOptionProps) {
  const handlePress = useCallback(() => {
    onSelect(value);
  }, [onSelect, value]);

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, isSelected && styles.selectedContainer]}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={`${label}. ${description}`}
    >
      <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
        {isSelected ? <View style={styles.radioInner} /> : null}
      </View>

      <View style={styles.textGroup}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
}

export const AnswerOption = memo(AnswerOptionComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  selectedContainer: {
    borderColor: colors.accent,
    backgroundColor: '#1F1710',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.accent,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
  },
  textGroup: {
    flex: 1,
    gap: 4,
  },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  description: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
});