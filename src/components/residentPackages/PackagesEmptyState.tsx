import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/molecules/ThemedText';
import { getTranslation } from '@/translations';

export const PackagesEmptyState = () => {
  const text = getTranslation('scanned:residentPackages.emptyList');

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
