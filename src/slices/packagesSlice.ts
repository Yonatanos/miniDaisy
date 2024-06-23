import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationDateByPackageId, PackagesByResidentId, RecipientPackages } from '@/types';

interface PackagesState {
  packagesByResidentId: RecipientPackages | {};
  fetchPackagesQueryId: string;
}

const initialState: PackagesState = {
  packagesByResidentId: {},
  fetchPackagesQueryId: 'initialId',
};

const packagesSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setPackagesByResidentId: (state, action: PayloadAction<PackagesByResidentId>) => {
      state.packagesByResidentId = action.payload;
    },
    setFetchPackagesQueryId: (state, action: PayloadAction<string>) => {
      state.fetchPackagesQueryId = action.payload;
    },
  },
});

export const { setPackagesByResidentId, setFetchPackagesQueryId } = packagesSlice.actions;

export const packagesReducer = packagesSlice.reducer;
