import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PackagesByResidentId, RecipientPackages } from '@/types';

interface PackagesState {
  packagesByResidentId: RecipientPackages | {};
  fetchPackagesQueryId: string;
  notifiedPackagesCount: number;
}

const initialState: PackagesState = {
  packagesByResidentId: {},
  fetchPackagesQueryId: 'initialId',
  notifiedPackagesCount: 0,
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
    addNotifiedPackagesCount: (state, action: PayloadAction<number>) => {
      state.notifiedPackagesCount = state.notifiedPackagesCount + action.payload;
    },
    clearNotifiedPackagesCount: (state, action: PayloadAction<number>) => {
      state.notifiedPackagesCount = 0;
    },
    setIsNotified: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.packagesByResidentId = {
        ...state.packagesByResidentId,
        [id]: {
          ...state.packagesByResidentId[id],
          isNotified: true,
        },
      };
    },
  },
});

export const {
  setPackagesByResidentId,
  setFetchPackagesQueryId,
  setIsNotified,
  addNotifiedPackagesCount,
  clearNotifiedPackagesCount,
} = packagesSlice.actions;

export const packagesReducer = packagesSlice.reducer;
