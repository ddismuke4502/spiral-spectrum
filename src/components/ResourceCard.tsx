import { memo, useCallback } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { EducationalResource } from '../types/resource';

type ResourceCardProps = {
  resource: EducationalResource;
};

function ResourceCardComponent({ resource }: ResourceCardProps) {
  const handleOpen = useCallback(async () => {
    const canOpen = await Linking.canOpenURL(resource.url);

    if (canOpen) {
      await Linking.openURL(resource.url);
    }
  }, [resource.url]);

  return (
    <Pressable
      onPress={handleOpen}
      style={styles.card}
      accessibilityRole="link"
      accessibilityLabel={`Open resource: ${resource.title}`}
    >
      <View style={styles.header}>
        <Text style={styles.source}>{resource.source}</Text>
        <Text style={styles.openText}>Open</Text>
      </View>

      <Text style={styles.title}>{resource.title}</Text>
      <Text style={styles.description}>{resource.description}</Text>
    </Pressable>
  );
}

export const ResourceCard = memo(ResourceCardComponent);

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  source: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  openText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 24,
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
});