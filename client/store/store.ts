import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { sidebarSlice } from "./sidebarSlice";
import { createWrapper } from "next-redux-wrapper";
import { modalSlice } from "./modalSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [sidebarSlice.name]: sidebarSlice.reducer,
      [modalSlice.name]: modalSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
