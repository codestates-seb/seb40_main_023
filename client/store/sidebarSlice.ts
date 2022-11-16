import { createSlice, current } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface SidebarState {
  isOpenState: boolean;
}

const initialState: SidebarState = {
  isOpenState: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarState(state, action) {
      state.isOpenState = action.payload;
    },

    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.sidebar,
    //     };
    //   },
    // },
  },
});

export const { setSidebarState } = sidebarSlice.actions;
export const selectSidebarState = (state: AppState) =>
  state.sidebar.isOpenState;
export default sidebarSlice.reducer;
