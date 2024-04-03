import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: "",
  picUrl: "",
  isEmailVerify: false,
  isFillProfile: false,
  isShowProfile: false,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    toggleProfilePage(state) {
      state.isShowProfile = !state.isShowProfile;
    },
    fillProfile(state, action) {
      state.username = action.payload.username;
      state.picUrl = action.payload.picUrl;
      state.isEmailVerify = !!action.payload.isEmailVerify;
      state.isFillProfile = (!!action.payload.username && !!action.payload.picUrl);
    },
    logout(state) {
      state.email = "";
      state.token = "";
      state.isLogin = false;
    },
  },
});

export default profileSlice;
