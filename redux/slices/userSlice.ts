import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  accountId: string;
  password: string;
  nameKo: string;
  nickName: string;
  userBirth: string;
  email: string;
  userImg: string;
  agreeService: boolean;
  agreeInfo: boolean;
}

const initialState: UserState = {
  accountId: "",
  password: "",
  nameKo: "",
  nickName: "",
  userBirth: "",
  email: "",
  userImg: "",
  agreeService: false,
  agreeInfo: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => initialState,
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
