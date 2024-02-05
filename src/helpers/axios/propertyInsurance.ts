import { BaseRes, PROPERTY, instance } from ".";
import { PropertyCalcReq, PropertyCalcRes } from "../../models/interfaces";

export const calculatePropertyInsurance = async (data: PropertyCalcReq) => {
  return instance
    .post(`${PROPERTY}/CalculatePropertyInsurance`, data)
    .then((res) => res.data as BaseRes<PropertyCalcRes>)
    .catch((err) => console.error(err));
};
