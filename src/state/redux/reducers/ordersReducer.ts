import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrders } from "../../../helpers/axios/orders";
import { IOrder } from "../../../models/interfaces";

interface OrdersState {
  orders: IOrder[];
  loading: boolean;
  error: string | null;
  shouldUpdate: boolean;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  shouldUpdate: true,
};

export const fetchOrders = createAsyncThunk("user/fetchData", async () => {
  const response = await getOrders();
  return response;
});

export const ordersReducer = createSlice({
  name: "ordersReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.shouldUpdate = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload as IOrder[];
        state.shouldUpdate = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { setLoading } = ordersReducer.actions;
export default ordersReducer.reducer;
