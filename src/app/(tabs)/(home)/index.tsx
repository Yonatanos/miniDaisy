import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { StyleSheet, View, ActivityIndicator, Text, FlatList } from 'react-native';
import { ListSeparator } from '@/components/molecules/ListSeparator';
import { ThemedView } from '@/components/molecules/ThemedView';
import { PackagesEmptyState } from '@/components/residentPackages/PackagesEmptyState';
import { PackagesListHeader } from '@/components/residentPackages/PackagesListHeader';
import { ResidentPackages } from '@/components/residentPackages/residentPackages';
import Layout from '@/constants/Layout';
import { getMailRoomScannedItems, uuid } from '@/services';
import { clearNotifiedPackagesCount, setFetchPackagesQueryId } from '@/slices/packagesSlice';
import { dispatch } from '@/store/store';
import { RecipientPackages } from '@/types';

const HomeScreen = () => {
  const {
    isFetching,
    data: packagesData = [],
    refetch: refetchMailRoomScannedItems,
  } = useQuery<RecipientPackages[]>({
    queryKey: ['getMailRoomScannedItems'],
    queryFn: getMailRoomScannedItems,
  });

  const renderItem = ({ item, index }) => <ResidentPackages recipientPackages={item} />;
  const onRefresh = async () => {
    refetchMailRoomScannedItems();
    dispatch(setFetchPackagesQueryId(uuid()));
    dispatch(clearNotifiedPackagesCount());
  };

  if (isFetching)
    return (
      <ThemedView style={styles.fetchingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );

  return (
    <View style={[styles.container]}>
      <FlatList
        ItemSeparatorComponent={ListSeparator}
        ListEmptyComponent={isFetching ? ActivityIndicator : PackagesEmptyState}
        ListHeaderComponent={!isFetching && <PackagesListHeader recipientPackages={packagesData} />}
        contentContainerStyle={[isEmpty(packagesData) && styles.container, styles.paddingBottom]}
        data={packagesData}
        onRefresh={onRefresh}
        refreshing={isFetching}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paddingBottom: {
    paddingBottom: Layout.standardGap,
  },
  fetchingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
