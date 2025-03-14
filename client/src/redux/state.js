import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Tạo slice cho Redux state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Xuất actions
export const { setLogin, setLogout } = authSlice.actions;

// Tạo Redux store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
