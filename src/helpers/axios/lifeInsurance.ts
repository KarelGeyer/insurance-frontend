import { BaseRes, LIFE_INSURANCE, instance } from ".";
import {
  LifeInsuraceCalcReq,
  LifeInsuraceCalcRes,
} from "../../models/interfaces";

export const calculateLifeInsurance = async (
  data: LifeInsuraceCalcReq,
  FinallyClb?: () => void
) => {
  return instance
    .post(`${LIFE_INSURANCE}/CalculateLifeInsurance`, data)
    .then((res) => res.data as BaseRes<LifeInsuraceCalcRes>)
    .catch((err) => console.error(err))
    .finally(() => FinallyClb && FinallyClb());
};
