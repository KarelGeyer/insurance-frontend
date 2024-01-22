import axios from "axios";
import { BASE_API, BaseRes, PENSION } from ".";

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

export const calculatePension = async (data: PensionCalcReq) => {
  return axios
    .post(`${BASE_API}/${PENSION}/GetPensionValue`, data)
    .then((res) => res.data as BaseRes<PensionCalcRes>)
    .catch((err) => console.error(err));
};
