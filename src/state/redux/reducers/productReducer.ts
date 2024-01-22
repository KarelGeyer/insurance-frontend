import { createSlice } from "@reduxjs/toolkit";
import {
  ILifeInsuranceData,
  IPensionData,
  IPropertyInsuranceData,
} from "../../../models/interfaces";
import { Invalidity, ProductCategory } from "../../../helpers/enums";

interface ProductState {
  lifeInsuranceData: ILifeInsuranceData;
  propertyInsuranceData: IPropertyInsuranceData;
  pensionData: IPensionData;
  chosenProduct: ProductCategory | 0;
  monthlyIncome: number;
  productId?: string;
  productName?: string;
}

const initialState: ProductState = {
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
  },
  pensionData: {
    strategy: "Konzervativní",
    currentSavings: 0,
    yourContribution: 0,
    employerContribution: 0,
  },
  chosenProduct: 0,
  monthlyIncome: 0,
  productId: "",
  productName: "",
};

export const productReducer = createSlice({
  name: "appSettingsReducer",
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
        payload: { id: string; name: string; chosenProduct: ProductCategory };
      }
    ) => {
      return {
        ...state,
        productId: action.payload.id,
        productName: action.payload.name,
        chosenProduct: action.payload.chosenProduct,
      };
    },
  },
});

export const {
  setProductsLifeInsuranceData,
  setProductsPensionData,
  setProductPropertyInsuranceData,
  setProductBaseInfo,
} = productReducer.actions;
export default productReducer.reducer;
