import { createSlice } from "@reduxjs/toolkit";
import {
  ProductFilterType,
  ProductTypeViewType,
  ProductViewType,
} from "../../../models/types";
import { SortType } from "../../../helpers/enums";

interface AppSettings {
  productsView: ProductViewType;
  productTypeView: ProductTypeViewType;
  filterType: ProductFilterType;
  sortType: SortType;
  searchValue?: string;
  sidebarOpen: boolean;
}

const initialState: AppSettings = {
  productsView: "card",
  productTypeView: "Všechny produkty",
  filterType: "Název produktu",
  sortType: 1,
  searchValue: "",
  sidebarOpen: false,
};

export const appSettingsReducer = createSlice({
  name: "appSettingsReducer",
  initialState,
  reducers: {
    setProductsView: (state, action: { payload: ProductViewType }) => {
      state.productsView = action.payload;
    },
    setProductTypeView: (state, action: { payload: ProductTypeViewType }) => {
      state.productTypeView = action.payload;
    },
    setFilterType: (state, action: { payload: ProductFilterType }) => {
      state.filterType = action.payload;
    },
    setSortType: (state, action: { payload: SortType }) => {
      state.sortType = action.payload;
    },
    setSearchValue: (state, action: { payload: string }) => {
      state.searchValue = action.payload;
    },
    setSidebarOpen: (state, action: { payload: boolean }) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const {
  setProductsView,
  setProductTypeView,
  setFilterType,
  setSortType,
  setSearchValue,
  setSidebarOpen,
} = appSettingsReducer.actions;
export default appSettingsReducer.reducer;
