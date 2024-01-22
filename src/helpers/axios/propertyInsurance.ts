import axios from "axios";
import { BASE_API, BaseRes, PROPERTY } from ".";

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

interface PropertyCalc {
  propertyPrice: number;
  equipmentPrice: number;
  liabilityPrice: number;
  totalPrice: number;
}

export const calculatePropertyInsurance = async (data: PropertyCalcReq) => {
  return axios
    .post(`${BASE_API}/${PROPERTY}/CalculatePropertyInsurance`, data)
    .then((res) => res.data as BaseRes<PropertyCalcRes>)
    .catch((err) => console.error(err));
};
