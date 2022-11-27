import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

export interface loginState {
  isLoginState: boolean;
}

const initialState: loginState = {
  isLoginState: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginState(state, action) {
      state.isLoginState = action.payload;
    },
  },
});

export const { setLoginState } = loginSlice.actions;
export const selectLoginState = (state: AppState) => state.login.isLoginState;
export default loginSlice.reducer;
