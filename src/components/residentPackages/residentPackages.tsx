import { isEmpty } from 'lodash';
import React from 'react';
import { StyleSheet } from 'react-native';
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
    <ThemedView
      // onLayout={onLayout}
      isAnimated
      style={[styles.container, { backgroundColor }]}
    >
      <ResidentPackagesHeader
        email={email}
        isAllNotified={false} // TODO: UPDATE THIS
        packages={packages}
      />
      <ResidentPackagesDetails email={email} horizontal packages={packages} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    paddingVertical: Layout.smallGap,
    paddingHorizontal: Layout.standardGap,
  },
});
