import { isArray, isNumber } from 'lodash';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemedText } from '@/components/molecules/ThemedText';
import { ThemedView } from '@/components/molecules/ThemedView';
import Layout from '@/constants/Layout';
import { RootState } from '@/store/store';
import { getTranslation } from '@/translations';
import { PackagesByResidentId, RecipientPackages } from '@/types';

type Props = {
  recipientPackages: RecipientPackages[];
};

export const PackagesListHeader = ({ recipientPackages }: Props) => {
  const notifiedPackagesCount = useSelector(
    (state: RootState) => state.packages.notifiedPackagesCount,
  );
  if (!isArray(recipientPackages)) return null;
  const packagesCount = recipientPackages.reduce((acc, { packages }) => acc + packages.length, 0);
  const unNotifiedCount = packagesCount - notifiedPackagesCount;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">
        {getTranslation('scanned:scannedList.title', { packagesCount })}
      </ThemedText>
      <ThemedText type="subtitle">
        {getTranslation('scanned:scannedList.subtitle', { unNotifiedCount })}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: 'center',
    paddingTop: Layout.standardGap * 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
});
