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

export interface IOrder {
  id: string;
  productId: string;
  productName: string;
  name: string;
  surname: string;
  category: ProductCategory;
  date: string;
  yearlyPrice: number;
}

export interface IOrderInfo {
  productId: string;
  name: string;
  surname: string;
  date: string;
  yearlyPrice: number;
  emailAddress: string;
}

export interface IOrderDeleteRequest {
  orderId: string;
  email: string;
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

export interface PensionCalcReq {
  currentSavings: number;
  userContribution: number;
  employerContribution: number;
  pensionStrategy: string;
  productId: string;
  userAge: number;
}

export interface PensionCalcRes {
  valorization: number;
  totalSavings: number;
  stateContribution: number;
  stateContributionTotal: number;
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

export interface LifeInsuraceCalcReq {
  productId: string;
  deathInsurance: number;
  injuriesInsurance: number;
  diseasesInsurance: number;
  workIncapacityInsurance: number;
  hospitalizationInsurance: number;
  invalidityInsurance: number;
  hospitalizationLength: number;
  invalidityLevel: number;
  isSmoker: boolean;
  doesSport: boolean;
}

export interface LifeInsuraceCalc {
  deathInsurancePrice: number;
  diseasesInsurancePrice: number;
  hospitalizationInsurancePrice: number;
  injuriesInsurancePrice: number;
  invalidityInsurancePrice: number;
  totalInsurancePrice: number;
  workIncapacityInsurancePrice: number;
}

export interface LifeInsuraceCalcRes {
  monthlyLifeInsurance: LifeInsuraceCalc;
  yearlyLifeInsurance: LifeInsuraceCalc;
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

export interface PropertyCalcReq {
  productId: string;
  propertyType: string;
  street: string;
  city: string;
  zipCode: string;
  squareMeters: number;
  shouldCalculateProperty: boolean;
  shouldCalculateEquipment: boolean;
  shouldCalculateLiability: boolean;
}

export interface PropertyCalcRes {
  perMeterSquareCalc: PropertyCalc;
  totalCalc: PropertyCalc;
}

export interface PropertyCalc {
  propertyPrice: number;
  equipmentPrice: number;
  liabilityPrice: number;
  totalPrice: number;
}

export interface PropertyAddress {
  street: string;
  city: string;
  zipCode: string;
}
