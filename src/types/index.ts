export type ServerRecipient = {
  name: string;
  email: string;
};

export type ServerPackage = {
  id: string;
  type: string;
  carrier: string;
  recipient: ServerRecipient;
};

export type PackageDetails = {
  id: string;
  type: string;
  carrier: string;
  name: string;
};

export type RecipientPackages = {
  email: string;
  isNotified: boolean;
  packages: PackageDetails[];
};

export type PackagesByResidentId = {
  [email: string]: PackageDetails[];
};

export type NotificationDateByPackageId = Record<string, Date>;
