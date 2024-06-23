import { useHeaderHeight } from '@react-navigation/elements';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Button } from '@/components/molecules/Button';
import { ThemedView } from '@/components/molecules/ThemedView';
import { ResidentPackagesDetails } from '@/components/residentPackages/ResidentPackagesDetails';
import { ResidentPackagesHeader } from '@/components/residentPackages/ResidentPackagesHeader';
import { Colors } from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Strings from '@/constants/Strings';
import { createNotificationContent, notifyResidentAboutMail } from '@/services/mailRoom.service';
import { RootState } from '@/store/store';
import { getTranslation } from '@/translations';

const QUERY_KEY_INIT = 'notifyResidentAboutMail';

const ResidenceScreen = () => {
  const headerHeight = useHeaderHeight();
  const { top } = useSafeAreaInsets();
  const { id } = (useLocalSearchParams() as { id: string }) ?? {};
  const { packages } = useSelector(
    (state: RootState) => state.packages.packagesByResidentId[id] ?? [],
  );
  const packageQueryId = useSelector((state: RootState) => state.packages.fetchPackagesQueryId);
  const { bottom } = useSafeAreaInsets();
  const queryKey = useRef([`${QUERY_KEY_INIT}${id}${packageQueryId}`]);

  const {
    isFetching,
    isError,
    isSuccess,
    refetch: sendNotification,
  } = useQuery({
    queryKey: queryKey.current,
    queryFn: () => notifyResidentAboutMail(id, createNotificationContent(packages)),
    enabled: false,
  });

  const buttonText = isSuccess
    ? getTranslation('scanned:residents.notifyButtonSuccess')
    : getTranslation('scanned:residents.notifyButton');
  const errorText = isError ? getTranslation('notification:errorMsg') : Strings.EMPTY;

  const onNotify = () => {
    if (!isFetching) {
      sendNotification();
    }
  };

  return (
    <ScrollView>
      <ThemedView style={[styles.container, { paddingTop: top }]}>
        <ResidentPackagesHeader email={id} packages={packages} textStyle={styles.header} />
        <Button
          disabled={isSuccess}
          isLoading={isFetching}
          onPress={onNotify}
          style={[styles.button, isSuccess && styles.buttonSuccess]}
          text={buttonText}
        />
        <Text style={styles.errorTxt}>{errorText}</Text>
        <ResidentPackagesDetails packages={packages} />
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 170,
    borderRadius: 20,
  },
  buttonSuccess: {
    backgroundColor: Colors.daisy,
  },
  errorTxt: {
    color: Colors.error,
    fontSize: 14,
    marginVertical: Layout.smallGap,
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
  },
});

export default ResidenceScreen;
