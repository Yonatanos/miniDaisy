import { isEmpty } from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from '../molecules/ThemedView';
import { ResidentPackagesDetails } from './ResidentPackagesDetails';
import { ResidentPackagesHeader } from './ResidentPackagesHeader';
import Layout from '@/constants/Layout';
import { useThemeColor } from '@/hooks/useThemeColor';
import { RecipientPackages } from '@/types';

type Props = {
  recipientPackages: RecipientPackages;
};

export const ResidentPackages = ({ recipientPackages }: Props) => {
  const backgroundColor = useThemeColor({}, 'card');
  const { email, packages } = recipientPackages;

  if (!email || isEmpty(packages)) return null;

  return (
    <ThemedView isAnimated pointerEvents="auto" style={[styles.container, { backgroundColor }]}>
      <View pointerEvents="auto">
        <ResidentPackagesHeader email={email} packages={packages} />
        <ResidentPackagesDetails email={email} horizontal packages={packages} />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    paddingVertical: Layout.smallGap,
    paddingHorizontal: Layout.standardGap,
    borderWidth: 1,
  },
});
