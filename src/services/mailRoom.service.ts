import { isString } from 'lodash';
import { instance } from '@/services/kyInstance';
import { setPackagesByResidentId } from '@/slices/packagesSlice';
import { dispatch } from '@/store/store';
import { getTranslation } from '@/translations';
import { PackageDetails, PackagesByResidentId, RecipientPackages, ServerPackage } from '@/types';

type GetMailRoomScannedItemsResponse = {
  result: {
    packages: ServerPackage[];
  };
};

const groupByRecipient = (packages: ServerPackage[]) =>
  packages.reduce((residenceAcc, mailPackage: ServerPackage) => {
    const { id, type, carrier, recipient } = mailPackage;
    const { name, email } = recipient;

    if (!residenceAcc[email]) {
      residenceAcc[email] = {
        email,
        packages: [],
      };
    }

    residenceAcc[email].packages.push({ id, type, carrier, name });

    return residenceAcc;
  }, {});

export const getMailRoomScannedItems = async (): Promise<RecipientPackages[]> => {
  try {
    const response: GetMailRoomScannedItemsResponse = await instance
      .get('icu4lrltnqy8avbhx1iydcmz8x32roya')
      .json();

    const packagesByRecipient = groupByRecipient(response?.result?.packages ?? []);
    dispatch(setPackagesByResidentId(packagesByRecipient));

    return Object.values(packagesByRecipient);
  } catch (e) {
    console.log('[mailRoomService Error]: getMailRoomScannedItems', e);

    throw e;
  }
};

const handleNotificationResponseError = (response: string) => {
  const isFirstCharNumber = !response || (isString(response) && !isNaN(Number(response[0])));
  if (!isFirstCharNumber || response[0] === '0')
    throw new Error('Failed to notify resident about mail');
};

export const notifyResidentAboutMail = async (email: string, content: string) => {
  try {
    const response = await instance
      .post('qru1b8pse4hcr12ojiyala2wigym8h4y', {
        json: {
          notify: [{ email, content }],
        },
      })
      .text();

    handleNotificationResponseError(response);

    return response;
  } catch (e) {
    console.log('[mailRoomService Error]: notifyResidentAboutMail', e);

    // throw e;
    return 'error';
  }
};

export const createNotificationContent = (packages: PackageDetails[]) => {
  const itemsCount = packages.length;
  const name = packages[0]?.name ?? getTranslation('notification:customer');
  const itemLabel =
    itemsCount === 1
      ? getTranslation('notification:package')
      : getTranslation('notification:packages');

  return getTranslation('notification:notificationBuilder', {
    name: name,
    itemsCount,
    itemLabel: itemLabel,
    carriers: packages.map((pack) => `\'${pack.carrier}\'`).join(', '),
  });
};
