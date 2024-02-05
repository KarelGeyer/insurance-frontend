import { BaseRes, PENSION, instance } from ".";
import { PensionCalcReq, PensionCalcRes } from "../../models/interfaces";

export const calculatePension = async (data: PensionCalcReq) => {
  return instance
    .post(`${PENSION}/GetPensionValue`, data)
    .then((res) => res.data as BaseRes<PensionCalcRes>)
    .catch((err) => console.error(err));
};
