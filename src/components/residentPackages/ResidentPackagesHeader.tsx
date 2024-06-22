import { Link } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ThemedText } from '@/components/molecules/ThemedText';
import { PackageDetails } from '@/types';

type Props = {
  email: string;
  isAllNotified: boolean;
  packages: PackageDetails[];
};

export const ResidentPackagesHeader = ({ email, packages, isAllNotified }: Props) => {
  const { t } = useTranslation(['scanned']);
  const headerText = t('scanned:residentPackages.header', {
    email,
    packagesCount: packages?.length,
  });

  return (
    <Link href={`/residents/${email}`}>
      <View>
        <ThemedText numberOfLines={2}>{headerText}</ThemedText>
      </View>
    </Link>
  );
};
