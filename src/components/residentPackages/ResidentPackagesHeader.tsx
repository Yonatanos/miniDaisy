import { Link } from 'expo-router';
import React from 'react';
import { TextStyle, View } from 'react-native';
import { ThemedText } from '@/components/molecules/ThemedText';
import { getTranslation } from '@/translations';
import { PackageDetails } from '@/types';

type Props = {
  email: string;
  packages: PackageDetails[];
  textStyle?: TextStyle;
};

export const ResidentPackagesHeader = ({ email, packages, textStyle }: Props) => {
  const headerText = getTranslation('scanned:residentPackages.header', {
    email,
    packagesCount: packages?.length,
  });

  return (
    <Link href={`/residents/${email}`}>
      <View>
        <ThemedText numberOfLines={2} style={textStyle}>
          {headerText}
        </ThemedText>
      </View>
    </Link>
  );
};
