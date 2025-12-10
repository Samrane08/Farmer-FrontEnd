import { createSlice } from "@reduxjs/toolkit";
import { parseToken } from "../../Services/jwtDecode";

const initialState = {
  token: "",
  fullName: "",
  bankId: 0,
  roleId: 0,
  districtId: 0,
  isFirstLogin: false,
};

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    setToken(state, action) {
      const token = action.payload;
      const decoded = parseToken(token);

      state.token = token;
      state.fullName = decoded.Name;
      state.roleId = decoded.RoleId;
      state.bankId = decoded.BankId;
      state.districtId = decoded.DistrictId;
    },

    setIsFirstLogin(state, action) {
      state.isFirstLogin = action.payload;
    },

    resetAllAuthentication() {
      return initialState;
    },
  },
});

export const { setToken, setIsFirstLogin, resetAllAuthentication } =
  authenticateSlice.actions;

export default authenticateSlice.reducer;
