import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/molecules/ThemedText';

export const PackagesEmptyState = () => {
  const { t } = useTranslation(['scanned']);
  const text = t('scanned:residentPackages.emptyList');

  return (
    <View style={styles.container}>
      <ThemedText>{text}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
