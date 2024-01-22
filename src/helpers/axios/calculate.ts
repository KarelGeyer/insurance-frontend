import axios from "axios";
import { BaseRes } from ".";

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

export const calculateLifeInsurance = async (
  data: LifeInsuraceCalcReq,
  FinallyClb?: () => void
) => {
  return axios
    .post(
      "https://ganny01.bsite.net/api/Calculator/CalculateLifeInsurance",
      data
    )
    .then((res) => res.data as BaseRes<LifeInsuraceCalcRes>)
    .catch((err) => console.error(err))
    .finally(() => FinallyClb && FinallyClb());
};

export const calculatePension = async (data: PensionCalcReq) => {
  return axios
    .post("https://ganny01.bsite.net/api/Calculator/GetPensionValue", data)
    .then((res) => res.data as PensionCalcRes)
    .catch((err) => console.error(err));
};
