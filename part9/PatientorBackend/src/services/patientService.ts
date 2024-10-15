import {
  nonSensitivePatient,
  NewPatientEntry,
  Patient,
  NewEntry,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";
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
const getPatient = (id: string): Patient | undefined => {
  return patientData.find((e) => e.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const NewPatientEntry = {
    id: id,
    ...entry,
  };
  patientData.push(NewPatientEntry);
  return NewPatientEntry;
};
const addEntry = (entry: NewEntry, PatientID: string): Entry => {
  const idEntry = uuid();
  const newEntry = {
    id: idEntry,
    ...entry,
  };
  const patient = patientData.find((e) => e.id === PatientID);
  if(patient) patient.entries.push(newEntry);
  return newEntry;
};
export default { getPatients, addPatient, getPatient, addEntry };
