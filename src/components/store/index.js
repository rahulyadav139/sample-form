import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  isModal: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
    showModal(state) {
      state.isModal = true;
    },
    hideModal(state) {
      state.isModal = false;
    },
  },
});

const store = configureStore({
  reducer: authSlice.reducer,
});

export const authActions = authSlice.actions;

export default store;
