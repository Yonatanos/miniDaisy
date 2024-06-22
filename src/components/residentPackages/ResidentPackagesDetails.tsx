import { email } from '@sideway/address';
import { Link } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { ThemedText } from '@/components/molecules/ThemedText';
import Layout from '@/constants/Layout';
import Strings from '@/constants/Strings';
import { useThemeColor } from '@/hooks/useThemeColor';
import { PackageDetails } from '@/types';

const CARD_WIDTH = Layout.maxContentWidth - 3 * Layout.standardGap;

type Props = {
  packages: PackageDetails[];
  email?: string;
  horizontal?: boolean;
};

export const ResidentPackagesDetails = ({ packages, horizontal, email }: Props) => {
  const backgroundColor = useThemeColor({}, 'card');
  const { t } = useTranslation(['scanned']);
  const displayVertically = packages.length === 1 || !horizontal;
  const numberOfLines = horizontal ? 1 : null;
  const renderPackages = () =>
    packages.map((pack, index) => {
      const {
        carrier = Strings.EMPTY,
        type = Strings.EMPTY,
        name = Strings.EMPTY,
        id = Strings.EMPTY,
      } = pack;
      const recipient = t('scanned:residentPackages.details.to', { name });
      const from = t('scanned:residentPackages.details.from', { carrier });
      const size = t('scanned:residentPackages.details.type', { type });
      const packId = t('scanned:residentPackages.details.id', { id });

      console.log(':: packages[0]', packages[0]);

      return (
        <Link disabled={!email || !horizontal} href={`/residents/${email}`} key={index}>
          <View
            style={[
              styles.card,
              index === 0 && styles.cardFirst,
              index === packages.length - 1 && styles.lastCard,
              displayVertically && styles.singleItemCard,
              !horizontal && styles.verticalCard,
              !horizontal && { backgroundColor },
            ]}
          >
            <ThemedText numberOfLines={numberOfLines}>{recipient}</ThemedText>
            <ThemedText numberOfLines={numberOfLines}>{from}</ThemedText>
            <ThemedText numberOfLines={numberOfLines}>{size}</ThemedText>
            <ThemedText numberOfLines={numberOfLines}>{packId}</ThemedText>
          </View>
        </Link>
      );
    });

  return (
    <View>
      <ScrollView
        horizontal={horizontal}
        pagingEnabled
        scrollEnabled={horizontal && packages.length > 1}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={[styles.scrollView, !horizontal && styles.verticalScrollView]}
      >
        {renderPackages()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    overflow: 'visible',
    width: CARD_WIDTH,
    marginTop: Layout.standardGap,
  },
  verticalScrollView: {
    width: Layout.maxContentWidth,
    overflow: 'hidden',
  },
  packageDescription: {
    width: CARD_WIDTH,
    borderRadius: 8,
  },
  cardFirst: {
    paddingLeft: 12,
  },
  card: {
    width: CARD_WIDTH,
    paddingRight: Layout.standardGap,
    paddingLeft: Layout.standardGap,
    borderRightWidth: 1,
  },
  singleItemCard: {
    borderRightWidth: 0,
    width: CARD_WIDTH - Layout.standardGap,
  },
  lastCard: {
    borderRightWidth: 0,
  },
  verticalCard: {
    borderRightWidth: 0,
    paddingLeft: 0,
    marginBottom: Layout.standardGap,
    width: Layout.maxContentWidth,
    borderRadius: Layout.smallGap,
  },
});
