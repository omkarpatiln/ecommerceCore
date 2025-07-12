import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MAIN_PROFILE_DATA } from '../../Modules/interface';

interface UserState {
  user: MAIN_PROFILE_DATA | null;
  ShowSplash: boolean;
}

const initialState: UserState = {
  user: null,
  ShowSplash: true,
};

export const userStateSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<MAIN_PROFILE_DATA>) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
    setShowSplash: (state, action: PayloadAction<boolean>) => {
      state.ShowSplash = action.payload;
    },
  },
});

export const { setUser, clearUser, setShowSplash } = userStateSlice.actions;
export default userStateSlice.reducer;
