import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ILifeInsuranceData,
  IPensionData,
  IProduct,
  IPropertyInsuranceData,
} from "../../../models/interfaces";
import { Invalidity, ProductCategory } from "../../../helpers/enums";
import { getProduct } from "../../../helpers/axios/products";

interface ProductState {
  baseProductInfo: {
    product: IProduct;
    loading: boolean;
    error: string;
  };
  lifeInsuranceData: ILifeInsuranceData;
  propertyInsuranceData: IPropertyInsuranceData;
  pensionData: IPensionData;
  productCategory: ProductCategory;
  monthlyIncome: number;
  productId?: string;
  productName?: string;
}

const initialState: ProductState = {
  baseProductInfo: {
    product: {
      id: "",
      name: "",
      description: "",
      companyName: "",
      companyLogo: "",
      category: ProductCategory.LIFE_INSURANCE,
    } as IProduct,
    loading: false,
    error: "",
  },
  lifeInsuranceData: {
    death: 0,
    injuries: 0,
    diseases: 0,
    workIncapacity: 0,
    hospitalization: 0,
    hospitalizationLength: 0,
    invalidity: 0,
    invalidityLevel: Invalidity.NO_INVALIDITY,
    smoker: false,
    doesSport: false,
  },
  propertyInsuranceData: {
    propertyType: "none",
    insuranceTypes: {
      property: false,
      equipment: false,
      liability: false,
    },
    propertyAddress: {
      street: "",
      city: "",
      zipCode: "",
    },
    squareMeters: 0,
  },
  pensionData: {
    strategy: "Konzervativní",
    currentSavings: 0,
    yourContribution: 0,
    employerContribution: 0,
  },
  productCategory: ProductCategory.NONE,
  monthlyIncome: 0,
  productId: "",
  productName: "",
};

export const fetchProductInfo = createAsyncThunk(
  "product/fetchData",
  async (id: string) => {
    const response = await getProduct(id);
    return response;
  }
);

export const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setProductsLifeInsuranceData: (
      state,
      action: { payload: ILifeInsuranceData }
    ) => {
      return {
        ...state,
        pensionData: {} as IPensionData,
        propertyInsuranceData: {} as IPropertyInsuranceData,
        lifeInsuranceData: action.payload,
      };
    },
    setProductsPensionData: (state, action: { payload: IPensionData }) => {
      return {
        ...state,
        lifeInsuranceData: {} as ILifeInsuranceData,
        propertyInsuranceData: {} as IPropertyInsuranceData,
        pensionData: action.payload,
      };
    },
    setProductPropertyInsuranceData: (
      state,
      action: { payload: IPropertyInsuranceData }
    ) => {
      return {
        ...state,
        lifeInsuranceData: {} as ILifeInsuranceData,
        pensionData: {} as IPensionData,
        propertyInsuranceData: action.payload,
      };
    },
    setProductBaseInfo: (
      state,
      action: {
        payload: { id: string; name: string; productCategory: ProductCategory };
      }
    ) => {
      return {
        ...state,
        productId: action.payload.id,
        productName: action.payload.name,
        productCategory: action.payload.productCategory,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductInfo.pending, (state) => {
      return {
        ...state,
        baseProductInfo: {
          ...state.baseProductInfo,
          loading: true,
        },
      };
    });
    builder.addCase(fetchProductInfo.fulfilled, (state, action) => {
      return {
        ...state,
        baseProductInfo: {
          error: "",
          product: action.payload,
          loading: false,
        },
      };
    });
    builder.addCase(fetchProductInfo.rejected, (state, action) => {
      return {
        ...state,
        baseProductInfo: {
          product: {} as IProduct,
          loading: false,
          error: action.error.message || "Error",
        },
      };
    });
  },
});

export const {
  setProductsLifeInsuranceData,
  setProductsPensionData,
  setProductPropertyInsuranceData,
  setProductBaseInfo,
} = productReducer.actions;
export default productReducer.reducer;
