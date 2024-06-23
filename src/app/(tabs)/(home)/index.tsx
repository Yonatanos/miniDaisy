import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Animated from 'react-native-reanimated';
import { ListSeparator } from '@/components/molecules/ListSeparator';
import { PackagesEmptyState } from '@/components/residentPackages/PackagesEmptyState';
import { ResidentPackages } from '@/components/residentPackages/residentPackages';
import Layout from '@/constants/Layout';
import { getMailRoomScannedItems, uuid } from '@/services';
import { setFetchPackagesQueryId } from '@/slices/packagesSlice';
import { dispatch } from '@/store/store';

const HomeScreen = () => {
  const {
    isFetching,
    data: packagesData = [],
    refetch: refetchMailRoomScannedItems,
  } = useQuery({
    queryKey: ['getMailRoomScannedItems'],
    queryFn: getMailRoomScannedItems,
  });

  const renderItem = ({ item, index }) => <ResidentPackages recipientPackages={item} />;
  const onRefresh = async () => {
    refetchMailRoomScannedItems();
    dispatch(setFetchPackagesQueryId(uuid()));
  };

  return (
    <View style={[styles.container]}>
      <Animated.FlatList
        ItemSeparatorComponent={ListSeparator}
        ListEmptyComponent={isFetching ? ActivityIndicator : PackagesEmptyState}
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
});

export default HomeScreen;
