import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

export interface ModalState {
  isOpenState: boolean;
}

const initialState: ModalState = {
  isOpenState: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalState(state, action) {
      state.isOpenState = action.payload;
    },
  },
});

export const { setModalState } = modalSlice.actions;
export const selectModalState = (state: AppState) => state.modal.isOpenState;
export default modalSlice.reducer;
