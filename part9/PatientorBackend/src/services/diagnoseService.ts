import diagnoseData from "../../data/diagnoses";
import { Diagnose } from "../types";
const getDiagnose = (): Diagnose[] => {
  return diagnoseData;
};
export default { getDiagnose };
