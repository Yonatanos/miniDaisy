import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/molecules/ThemedText';
import { ThemedView } from '@/components/molecules/ThemedView';
import { getTranslation } from '@/translations';

const TabTwoScreen = () => {
  return (
    <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ThemedText>{getTranslation('routing:tabNotified.title')}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default TabTwoScreen;
