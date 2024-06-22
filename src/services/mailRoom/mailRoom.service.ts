import { instance } from '@/services/instance';
import { setPackagesByResidentId } from '@/slices/packagesSlice';
import { dispatch } from '@/store/store';
import { ServerPackage } from '@/types';

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

export const getMailRoomScannedItems = async () => {
  try {
    const response: GetMailRoomScannedItemsResponse = await instance
      .get('icu4lrltnqy8avbhx1iydcmz8x32roya')
      .json();

    // const mockedPackages = [
    //   {
    //     id: '1',
    //     type: 'Medium',
    //     carrier:
    //       'Quality Quidditch Supplies laksjdhalksjdhlaksjdhlaksjhdlkajshdlkajshdlkajhldkjahslkdjahs',
    //     recipient: {
    //       name: 'Ginny Weasley',
    //       email: 'ginny@gryffindor.com',
    //     },
    //   },
    //   {
    //     id: '2',
    //     type: 'Large',
    //     carrier: "Madam Malkin's",
    //     recipient: {
    //       name: 'Neville Longbottom',
    //       email: 'neville@gryffindor.com',
    //     },
    //   },
    //   {
    //     id: '3',
    //     type: 'Small',
    //     carrier:
    //       'Quality Quidditch Supplies alksjdhfalksjdfhlaksdjhflkasjdhflkajshdflkjashdflkjahsdlfkjhasldkfjhaslkdjfhalskdjfhlaksjdhflkasjdhflkasjhdflkajshdflk',
    //     recipient: {
    //       name: 'Ron Weasley',
    //       email:
    //         'isAnimatedisAnimatedron@gryffindor.com+Asfaslkdjfhasldkfjhaslkdjfhalskdjfhlaksjdhflkasjdhflkasjdhflkajshdflkajshdlfkjhasdlkfjhaslkdjfhalskdjhflaksdjhflkasjdhflkasjdhflkajsbdnflkajsdcvlhasdbvljahsdbgladshflkjashdflkjashdflkjashdflkjashdlkfjahsdlkfja+Asfaslkdjfhasldkfjhaslkdjfhalskdjfhlaksjdhflkasjdhflkasjdhflkajshdflkajshdlfkjhasdlkfjhaslkdjfhalskdjhflaksdjhflkasjdhflkasjdhflkajsbdnflkajsdcvlhasdbvljahsdbgladshflkjashdflkjashdflkjashdflkjashdlkfjahsdlkfja',
    //     },
    //   },
    //   {
    //     id: '4',
    //     type: 'Large',
    //     carrier: 'Flourish And Blotts',
    //     recipient: {
    //       name: 'Hermione Granger',
    //       email: 'hermione@gryffindor.com',
    //     },
    //   },
    //   {
    //     id: '5',
    //     type: 'Large',
    //     carrier: 'Borgin and Burkes',
    //     recipient: {
    //       name: 'Draco Malfoy',
    //       email: 'draco@slytherin.com',
    //     },
    //   },
    //   {
    //     id: '6',
    //     type: 'Medium',
    //     carrier: 'Honeydukes Sweetshop',
    //     recipient: {
    //       name: 'Ron Weasley',
    //       email:
    //         'isAnimatedisAnimatedron@gryffindor.com+Asfaslkdjfhasldkfjhaslkdjfhalskdjfhlaksjdhflkasjdhflkasjdhflkajshdflkajshdlfkjhasdlkfjhaslkdjfhalskdjhflaksdjhflkasjdhflkasjdhflkajsbdnflkajsdcvlhasdbvljahsdbgladshflkjashdflkjashdflkjashdflkjashdlkfjahsdlkfja+Asfaslkdjfhasldkfjhaslkdjfhalskdjfhlaksjdhflkasjdhflkasjdhflkajshdflkajshdlfkjhasdlkfjhaslkdjfhalskdjhflaksdjhflkasjdhflkasjdhflkajsbdnflkajsdcvlhasdbvljahsdbgladshflkjashdflkjashdflkjashdflkjashdlkfjahsdlkfja',
    //     },
    //   },
    //   {
    //     id: '7',
    //     type: 'Small',
    //     carrier: 'Dervish and Banges',
    //     recipient: {
    //       name: 'Ron Weasley',
    //       email:
    //         'isAnimatedisAnimatedron@gryffindor.com+Asfaslkdjfhasldkfjhaslkdjfhalskdjfhlaksjdhflkasjdhflkasjdhflkajshdflkajshdlfkjhasdlkfjhaslkdjfhalskdjhflaksdjhflkasjdhflkasjdhflkajsbdnflkajsdcvlhasdbvljahsdbgladshflkjashdflkjashdflkjashdflkjashdlkfjahsdlkfja+Asfaslkdjfhasldkfjhaslkdjfhalskdjfhlaksjdhflkasjdhflkasjdhflkajshdflkajshdlfkjhasdlkfjhaslkdjfhalskdjhflaksdjhflkasjdhflkasjdhflkajsbdnflkajsdcvlhasdbvljahsdbgladshflkjashdflkjashdflkjashdflkjashdlkfjahsdlkfja',
    //     },
    //   },
    //   {
    //     id: '8',
    //     type: 'Large',
    //     carrier: "Scrivenshaft's Quill Shop",
    //     recipient: {
    //       name: 'Luna Lovegood',
    //       email: 'luna@ravenclaw.com',
    //     },
    //   },
    //   {
    //     id: '9',
    //     type: 'Large',
    //     carrier: 'Gladrags Wizardwear',
    //     recipient: {
    //       name: 'Dobby',
    //       email: 'dobby@hogwarts.com',
    //     },
    //   },
    //   {
    //     id: '10',
    //     type: 'Extra Large',
    //     carrier: 'Quality Quidditch Supplies',
    //     recipient: {
    //       name: 'Harry Potter',
    //       email: 'harry@gryffindor.com',
    //     },
    //   },
    //   {
    //     id: '11',
    //     type: 'Large',
    //     carrier: "The Hog's Head",
    //     recipient: {
    //       name: 'Draco Malfoy',
    //       email: 'draco@slytherin.com',
    //     },
    //   },
    //   {
    //     id: '12',
    //     type: 'Small laskdjfhalksdjfhlaksdjhflkasjdhflkasjdhflkasjdhflkajshdflkjashdlfkjashdlkfjhaslkdjfhalskdjhflkasjdhflkasjh',
    //     carrier: 'Weasley’s Wizard Wheezes',
    //     recipient: {
    //       name: 'Ginny Weasley',
    //       email: 'ginny@gryffindor.com',
    //     },
    //   },
    //   {
    //     id: '13',
    //     type: 'Small',
    //     carrier: "The Hog's Head",
    //     recipient: {
    //       name: 'Albus Dumbledore',
    //       email: 'albus@hogwarts.com',
    //     },
    //   },
    //   {
    //     id: '14',
    //     type: 'Medium',
    //     carrier: 'Weasley’s Wizard Wheezes',
    //     recipient: {
    //       name: 'Harry Potter',
    //       email: 'harry@gryffindor.com',
    //     },
    //   },
    //   {
    //     id: '15',
    //     type: 'Small',
    //     carrier: 'Dervish and Banges',
    //     recipient: {
    //       name: 'Hermione Granger',
    //       email: 'hermione@gryffindor.com',
    //     },
    //   },
    // ];
    //
    // const response = {
    //   result: {
    //     packages: mockedPackages,
    //   },
    // };

    const packagesByRecipient = groupByRecipient(response?.result?.packages ?? []);
    dispatch(setPackagesByResidentId(packagesByRecipient));

    return Object.values(packagesByRecipient);
    // return packages;
  } catch (e) {
    const xerror = e;
    console.log('[mailRoomService Error]: getMailRoomScannedItems', e);
    console.log(':: error', e);

    throw e;
  }
};

const notifyResidentAboutMail = async (email: string, content: string) => {
  try {
    await instance.post('qru1b8pse4hcr12ojiyala2wigym8h4y', {
      json: {
        notify: [{ email, content }],
      },
    });
  } catch (e) {
    console.log('[mailRoomService Error]: notifyResidentAboutMail', e);

    throw e;
  }
};
