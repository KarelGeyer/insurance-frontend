import { configureStore } from "@reduxjs/toolkit";
import appSettingsReducer from "./reducers/appSettingsReducer";
import productReducer from "./reducers/productReducer";
import ordersReducer from "./reducers/ordersReducer";

export const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
    product: productReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
