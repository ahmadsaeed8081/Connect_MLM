import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
const Store = configureStore({
  reducer: {
    authReducer: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
});

export default Store;
