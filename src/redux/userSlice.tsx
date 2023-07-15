import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
}

const initialState: UserState = {
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsernameRedux: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setUsernameRedux } = userSlice.actions;
export default userSlice.reducer;
