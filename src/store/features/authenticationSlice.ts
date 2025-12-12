import { createSlice } from "@reduxjs/toolkit";
import { parseToken } from "../../Services/jwtDecode";

const initialState = {
  token: "",
  isFirstLogin: false,
};

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },

    setIsFirstLogin(state, action) {
        state.isFirstLogin = action.payload != null;
    },


    resetAllAuthentication() {
      return initialState;
    },
  },
});

export const { setToken, setIsFirstLogin, resetAllAuthentication } =
  authenticateSlice.actions;

export default authenticateSlice.reducer;
