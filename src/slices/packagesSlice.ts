import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationDateByPackageId, PackagesByResidentId, RecipientPackages } from '@/types';

interface PackagesState {
  packagesByResidentId: RecipientPackages | {};
  notificationDateByPackageId: NotificationDateByPackageId;
}

const initialState: PackagesState = {
  packagesByResidentId: {},
  notificationDateByPackageId: {},
};

const packagesSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setPackagesByResidentId: (state, action: PayloadAction<PackagesByResidentId>) => {
      state.packagesByResidentId = action.payload;
    },
    updateNotificationDate: (state, action: PayloadAction<{ id: string; date: Date }>) => {
      const { id, date } = action?.payload || {};
      id && date && (state.notificationDateByPackageId[id] = action.payload.date);
    },
  },
});

export const { setPackagesByResidentId, updateNotificationDate } = packagesSlice.actions;

export const packagesReducer = packagesSlice.reducer;
