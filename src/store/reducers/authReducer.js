import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");

const authReducer = createSlice({
  name: "authReducer",
  initialState: {
    userToken: token ? token : "",
    searchedUser: "",
  },
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setSearchedUser: (state, action) => {
      state.searchedUser = action.payload;
    },

    logout: (state, { payload }) => {
      localStorage.removeItem("token");
      state.userToken = null;
    },
  },
});
export const { setUserToken, setSearchedUser, logout } = authReducer.actions;
export default authReducer.reducer;
