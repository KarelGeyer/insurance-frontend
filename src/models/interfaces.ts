import { Invalidity, ProductCategory } from "../helpers/enums";
import { PensionStrategy, PropertyType, RouteType } from "./types";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  companyName: string;
  companyLogo: string;
  category: ProductCategory;
}

export interface ILocationState {
  pathname: RouteType;
}

export interface PersonData {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  age: number;
}

export interface AdditinalPersonData {
  height: number;
  weight: number;
}

export interface IPensionData {
  strategy: PensionStrategy;
  currentSavings: number;
  yourContribution: number;
  employerContribution: number;
}

export interface ILifeInsuranceData {
  death: number;
  injuries: number;
  diseases: number;
  workIncapacity: number;
  hospitalization: number;
  hospitalizationLength: number;
  invalidity: number;
  invalidityLevel: Invalidity;
  smoker: boolean;
  doesSport: boolean;
}

export interface IPropertyInsuranceData {
  propertyType: PropertyType;
  insuranceTypes: {
    property: boolean;
    equipment: boolean;
    liability: boolean;
  };
  propertyAddress: PropertyAddress;
  squareMeters: number;
}

export interface PropertyAddress {
  street: string;
  city: string;
  zipCode: string;
}
