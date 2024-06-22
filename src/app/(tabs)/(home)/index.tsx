import { useQuery } from '@tanstack/react-query';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListSeparator } from '@/components/molecules/ListSeparator';
import { ThemedText } from '@/components/molecules/ThemedText';
import { PackagesEmptyState } from '@/components/residentPackages/PackagesEmptyState';
import { ResidentPackages } from '@/components/residentPackages/residentPackages';
import Layout from '@/constants/Layout';
import { getMailRoomScannedItems } from '@/services/mailRoom';

export default function HomeScreen() {
  const { bottom } = useSafeAreaInsets();
  const {
    isFetching,
    data: packagesData = [],
    isError,
    refetch: refetchMailRoomScannedItems,
  } = useQuery({
    queryKey: ['getMailRoomScannedItems'],
    queryFn: getMailRoomScannedItems,
  });

  const renderItem = ({ item, index }) => <ResidentPackages recipientPackages={item} />;

  return (
    <FlatList
      ItemSeparatorComponent={ListSeparator}
      ListEmptyComponent={PackagesEmptyState}
      contentContainerStyle={[styles.container, { paddingBottom: bottom }]}
      data={packagesData}
      onRefresh={refetchMailRoomScannedItems}
      refreshing={isFetching}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
