import axios from "axios";
import { BASE_API, BaseRes, LIFE_INSURANCE } from ".";

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
    .post(`${BASE_API}/${LIFE_INSURANCE}/CalculateLifeInsurance`, data)
    .then((res) => res.data as BaseRes<LifeInsuraceCalcRes>)
    .catch((err) => console.error(err))
    .finally(() => FinallyClb && FinallyClb());
};
