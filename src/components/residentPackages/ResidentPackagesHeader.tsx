import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemedText } from '@/components/molecules/ThemedText';
import { Colors } from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { RootState } from '@/store/store';
import { getTranslation } from '@/translations';
import { PackageDetails } from '@/types';

type Props = {
  email: string;
  packages: PackageDetails[];
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  showIndicator?: boolean;
};

export const ResidentPackagesHeader = ({
  email,
  packages,
  textStyle,
  showIndicator = true,
  containerStyle,
}: Props) => {
  const { isNotified } = useSelector(
    (state: RootState) => state.packages.packagesByResidentId[email],
  );

  const headerText = getTranslation('scanned:residentPackages.header', {
    email,
    packagesCount: packages?.length,
  });

  return (
    <Link href={`/residents/${email}`}>
      <View style={[styles.container, containerStyle]}>
        <ThemedText numberOfLines={2} style={textStyle} type="defaultSemiBold">
          {headerText}
        </ThemedText>
        {showIndicator && (
          <ThemedText
            style={[
              styles.indicatorsText,
              { backgroundColor: isNotified ? Colors.daisy : Colors.alert },
            ]}
          >
            {isNotified
              ? getTranslation('scanned:residentPackages.status.notified')
              : getTranslation('scanned:residentPackages.status.notNotified')}
          </ThemedText>
        )}
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: Layout.maxContentWidth,
    justifyContent: 'space-between',
  },
  indicatorsText: {
    textAlignVertical: 'center',
    alignItems: 'center',
    lineHeight: 36,
  },
});
