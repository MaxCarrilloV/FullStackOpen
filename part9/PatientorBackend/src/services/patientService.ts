import { nonSensitivePatient, NewPatientEntry, Patient } from "../types";
import { v1 as uuid } from 'uuid'
import patientData from "../../data/patients";
const getPatients = (): nonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry:NewPatientEntry):Patient => {
    const id = uuid()
    const NewPatientEntry = {
        id:id,
        ...entry,
    }
    patientData.push(NewPatientEntry)
    return NewPatientEntry
}
export default { getPatients,addPatient };
