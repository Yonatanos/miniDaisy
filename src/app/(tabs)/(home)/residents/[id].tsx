import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Button } from '@/components/molecules/Button';
import { ThemedView } from '@/components/molecules/ThemedView';
import { ResidentPackagesDetails } from '@/components/residentPackages/ResidentPackagesDetails';
import { ResidentPackagesHeader } from '@/components/residentPackages/ResidentPackagesHeader';
import Layout from '@/constants/Layout';
import { RootState } from '@/store/store';

const ResidencePage = () => {
  const { t } = useTranslation(['scanned']);
  const buttonText = t('scanned:residents.notifyButton');

  const { id } = (useLocalSearchParams() as { id: string }) ?? {};
  const { packages } = useSelector(
    (state: RootState) => state.packages.packagesByResidentId[id] ?? [],
  );
  const { bottom, top } = useSafeAreaInsets();
  const onNotify = () => {};

  return (
    <ThemedView style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <ResidentPackagesHeader email={id} isAllNotified={false} packages={packages} />
      <Button onPress={onNotify} text={buttonText} />
      <ResidentPackagesDetails packages={[...packages, ...packages, ...packages]} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Layout.standardGap,
  },
});

export default ResidencePage;
