import { View, StyleSheet } from 'react-native';
import Layout from '@/constants/Layout';

export const ListSeparator = () => <View style={styles.separator} />;
const styles = StyleSheet.create({
  separator: {
    height: Layout.smallGap,
  },
});
